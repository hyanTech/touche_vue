<template>
    <!-- Conteneur principal qui centre la carte de remerciement -->
    <div class="bg-gray-50 font-sans flex items-center justify-center min-h-screen p-4">
  
      <!-- La carte de remerciement -->
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-[1.02] duration-300">
        
        <!-- Icône festive -->
        <div class="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <!-- Titre principal -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Merci pour votre commande !</h1>
        
        <!-- Message de confirmation -->
        <p class="text-gray-600 mb-6">
          Votre commande a été reçue avec succès. Un e-mail vous a été envoyé.
        </p>
        
        <!-- Affichage du numéro de commande -->
        <!-- <div v-if="orderId" class="bg-indigo-50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-500 mb-1">Votre numéro de commande est :</p>
          <p class="text-xl font-mono font-semibold text-indigo-600 tracking-wider">{{ orderId }}</p>
        </div> -->

        <!-- Compte à rebours -->
        <div class="mb-6 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-600 mb-1">Redirection automatique dans :</p>
          <p class="text-2xl font-bold text-blue-700">{{ countdown }} secondes</p>
        </div>
        
        <!-- Bouton d'action -->
        <div>
          <button @click="goToHome" class="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
            Continuer mes achats
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
              countdown: 10
          }
      },
      async mounted() {
          // Récupérer l'ID de commande depuis les query parameters
          this.orderId = this.$route.query.orderId;
          
          // Envoyer l'API d'envoi d'email dès l'arrivée sur la page
          if (this.orderId) {
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
  