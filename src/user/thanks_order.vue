<template>
  <!-- Conteneur principal qui centre la carte de remerciement -->
  <div class="bg-gray-50 font-sans flex items-center justify-center min-h-screen p-4">

    <!-- La carte de remerciement -->
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-[1.02] duration-300">
      
      <!-- Icône dynamique selon le statut -->
      <div class="mb-6">
        <!-- Icône de succès -->
        <svg v-if="paymentStatus === 'success'" xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Icône d'information -->
        <svg v-else-if="paymentStatus === 'info'" xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Icône d'avertissement -->
        <svg v-else-if="paymentStatus === 'warning'" xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        
        <!-- Icône d'erreur -->
        <svg v-else-if="paymentStatus === 'error'" xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Icône par défaut -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Titre dynamique selon le statut -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        {{ paymentTitle || getDefaultTitle() }}
      </h1>
      
      <!-- Message dynamique selon le statut -->
      <p class="text-gray-600 mb-6">
        {{ paymentMessage || getDefaultMessage() }}
      </p>
      
      <!-- Affichage du numéro de commande -->
      <!-- <div v-if="orderId" class="bg-indigo-50 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-500 mb-1">Votre numéro de commande est :</p>
        <p class="text-xl font-mono font-semibold text-indigo-600 tracking-wider">{{ orderId }}</p>
      </div> -->

      <!-- Compte à rebours -->
      <div class="mb-6 p-3 rounded-lg" :class="getCountdownClass()">
        <p class="text-sm mb-1" :class="getCountdownTextClass()">Redirection automatique dans :</p>
        <p class="text-2xl font-bold" :class="getCountdownNumberClass()">{{ countdown }} secondes</p>
      </div>
      
      <!-- Bouton d'action -->
      <div>
        <button @click="goToHome" class="w-full sm:w-auto font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300" :class="getButtonClass()">
          {{ getButtonText() }}
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { orderService } from '../config/api.js';
import { useUserNotification } from '../config/userNotification.js';

export default {
    name: 'ThanksOrder',
    data() {
        return {
            orderId: null,
            countdown: 15,
            paymentStatus: 'success', // 'success', 'info', 'warning', 'error'
            paymentTitle: '',
            paymentMessage: ''
        }
    },
    async mounted() {
        // Récupérer l'ID de commande depuis les query parameters
        this.orderId = this.$route.query.orderId;
        
        // Récupérer le statut de paiement depuis les query parameters
        this.paymentStatus = this.$route.query.paymentStatus || 'success';
        this.paymentTitle = this.$route.query.paymentTitle || '';
        this.paymentMessage = this.$route.query.paymentMessage || '';

        // Envoyer l'API d'envoi d'email seulement si le paiement est réussi
        if (this.orderId && this.paymentStatus === 'success') {
            this.sendOrderEmail();
        }
        
        // Démarrer le compte à rebours indépendamment de la réponse de l'API
        this.startCountdown();
    },
    methods: {
        async sendOrderEmail() {
            try {
                // Appel à l'API d'envoi d'email
                const response = await orderService.sendOrderEmail(this.orderId);
                console.log('Email envoyé avec succès:', response);
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                // Ne pas afficher d'erreur à l'utilisateur car le timer continue
            }
        },
        startCountdown() {
            const timer = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                    clearInterval(timer);
                    this.goToHome();
                }
            }, 1000);
        },
        goToHome() {
            this.$router.push('/');
        },
        getDefaultTitle() {
            const titles = {
                'success': 'Paiement confirmé avec succès !',
                'info': 'Paiement en cours de traitement',
                'warning': 'Paiement annulé',
                'error': 'Échec du paiement'
            };
            return titles[this.paymentStatus] || 'Merci pour votre commande !';
        },
        getDefaultMessage() {
            const messages = {
                'success': 'Votre paiement a été traité avec succès. Votre commande est maintenant confirmée et sera traitée. Un mail de confirmation vous a été envoyé.',
                'info': 'Votre paiement est en cours de traitement. Veuillez patienter pendant que nous finalisons votre transaction.',
                'warning': 'Votre paiement a été annulé.',
                'error': 'Votre paiement a été échoué.'
            };
            return messages[this.paymentStatus] || 'Votre commande a été reçue avec succès. Un e-mail vous a été envoyé.';
        },
        getCountdownClass() {
            const classes = {
                'success': 'bg-green-50',
                'info': 'bg-blue-50',
                'warning': 'bg-yellow-50',
                'error': 'bg-red-50'
            };
            return classes[this.paymentStatus] || 'bg-blue-50';
        },
        getCountdownTextClass() {
            const classes = {
                'success': 'text-green-600',
                'info': 'text-blue-600',
                'warning': 'text-yellow-600',
                'error': 'text-red-600'
            };
            return classes[this.paymentStatus] || 'text-blue-600';
        },
        getCountdownNumberClass() {
            const classes = {
                'success': 'text-green-700',
                'info': 'text-blue-700',
                'warning': 'text-yellow-700',
                'error': 'text-red-700'
            };
            return classes[this.paymentStatus] || 'text-blue-700';
        },
        getButtonClass() {
            const classes = {
                'success': 'bg-green-600 hover:bg-green-700 text-white',
                'info': 'bg-blue-600 hover:bg-blue-700 text-white',
                'warning': 'bg-yellow-600 hover:bg-yellow-700 text-white',
                'error': 'bg-red-600 hover:bg-red-700 text-white'
            };
            return classes[this.paymentStatus] || 'bg-indigo-600 hover:bg-indigo-700 text-white';
        },
        getButtonText() {
            const texts = {
                'success': 'Continuer mes achats',
                'info': 'Retour à l\'accueil',
                'warning': 'Réessayer le paiement',
                'error': 'Contacter le support'
            };
            return texts[this.paymentStatus] || 'Continuer mes achats';
        }
    }
}
</script>

<style>
/* Importation de la police Inter pour un look moderne */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>
