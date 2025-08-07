<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Loading state -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="flex items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Chargement des détails de la commande...</span>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-20">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h2>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button @click="loadOrderDetails" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Réessayer
          </button>
        </div>

        <!-- Order details -->
        <div v-else-if="order" class="space-y-6">
          <!-- Order Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">Détails de la Commande</h1>
              <p class="text-sm text-gray-500 mt-1">
                Commande #{{ order.numero_commande }} &bull; Passée le {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <span :class="getStatusClass(order.etat)" class="px-4 py-2 text-sm font-semibold rounded-full">
                {{ formatStatus(order.etat) }}
              </span>
            </div>
          </div>

          <!-- Main Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Product Details Card -->
              <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-6">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Produits Commandés</h2>
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr class="text-left text-xs text-gray-500 uppercase">
                          <th class="py-2 font-medium">Produit</th>
                          <th class="py-2 font-medium text-center">Quantité</th>
                          <th class="py-2 font-medium text-center">Taille/Couleur</th>
                          <th class="py-2 font-medium text-right">Prix Unitaire</th>
                          <th class="py-2 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in order.items" :key="item.id" class="border-t border-gray-200">
                          <td class="py-4 flex items-center">
                            <img :src="getImageUrl(item.product.image_cover)" :alt="item.product.nom" 
                                 class="h-16 w-16 rounded-md object-cover mr-4"
                                 @error="handleImageError">
                            <div>
                              <p class="font-semibold text-gray-800">{{ item.product.nom }}</p>
                              <p class="text-sm text-gray-500">Prix promo: {{ formatCurrency(item.product.prix_promotion) }}</p>
                            </div>
                          </td>
                          <td class="py-4 text-center text-gray-600">{{ item.quantite }}</td>
                          <td class="py-4 text-center text-gray-600">
                            <div v-if="item.taille || item.couleur">
                              <span v-if="item.taille" class="block text-xs">{{ item.taille }}</span>
                              <span v-if="item.couleur" class="block text-xs">{{ item.couleur }}</span>
                            </div>
                            <span v-else class="text-gray-400 text-xs">-</span>
                          </td>
                          <td class="py-4 text-right text-gray-600">{{ formatCurrency(item.prix_unitaire) }}</td>
                          <td class="py-4 text-right font-semibold text-gray-800">{{ formatCurrency(item.prix_total) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- Totals Section -->
                  <div class="mt-6 pt-4 border-t border-gray-200 text-right">
                    <div class="space-y-2">
                      <p class="text-gray-600">Sous-total: <span class="font-semibold text-gray-800 ml-2">{{ formatCurrency(order.montant_total) }}</span></p>
                      <p class="text-gray-600">Livraison: <span class="font-semibold text-gray-800 ml-2">{{ formatCurrency(order.frais_livraison) }}</span></p>
                      <p class="text-xl font-bold text-gray-900 mt-2">Total: <span class="text-blue-600 ml-2">{{ formatCurrency(order.montant_final) }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Notes Card -->
              <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-2">Note de la commande</h2>
                <p class="text-gray-600 italic">
                  {{ order.notes || "Aucune note pour cette commande." }}
                </p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="lg:col-span-1 space-y-6">
              <!-- Customer Details Card -->
              <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Informations du Client</h2>
                <div class="space-y-3">
                  <p class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ order.nom_client }} {{ order.prenom_client }}
                  </p>
                  <p class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ order.email_client }}
                  </p>
                  <p class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ order.numero_client }}
                  </p>
                  <p class="flex items-start text-gray-600">
                    <svg class="h-5 w-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="break-words">{{ order.adresse_client }}</span>
                  </p>
                </div>
              </div>

              <!-- Payment Details Card -->
              <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Détails du Paiement</h2>
                <div class="space-y-3">
                  <p class="text-gray-600"><strong>Type:</strong> {{ formatPaymentType(order.type_paiement) }}</p>
                  <p v-if="order.methode_paiement_en_ligne" class="text-gray-600">
                    <strong>Opérateur:</strong> {{ formatOperator(order.methode_paiement_en_ligne) }}
                  </p>
                  <p v-if="order.numero_paiement" class="text-gray-600">
                    <strong>Numéro:</strong> {{ order.numero_paiement }}
                  </p>
                  
                  <!-- Payment history -->
                  <div v-if="order.payments && order.payments.length > 0" class="mt-4">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">Historique des paiements</h3>
                    <div class="space-y-2">
                      <div v-for="payment in order.payments" :key="payment.id" class="bg-gray-50 p-3 rounded-lg">
                        <div class="flex justify-between items-start">
                          <div>
                            <p class="text-sm font-medium">{{ formatCurrency(payment.montant_paye) }}</p>
                            <p class="text-xs text-gray-500">{{ formatOperator(payment.operateur_paiement) }}</p>
                            <p class="text-xs text-gray-500">{{ formatDate(payment.date_paiement) }}</p>
                          </div>
                          <span :class="getPaymentStatusClass(payment.statut)" class="px-2 py-1 text-xs font-semibold rounded-full">
                            {{ formatPaymentStatus(payment.statut) }}
                          </span>
                        </div>
                        <p v-if="payment.notes" class="text-xs text-gray-600 mt-1">{{ payment.notes }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shipping Details Card -->
              <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Informations de Livraison</h2>
                <div class="space-y-3">
                  <p class="text-gray-600"><strong>Zone:</strong> {{ order.delivery?.nom || 'Non spécifiée' }}</p>
                  <p class="text-gray-600"><strong>Prix:</strong> {{ formatCurrency(order.delivery?.prix || 0) }}</p>
                  <p v-if="order.delivery?.description" class="text-gray-600">
                    <strong>Description:</strong> {{ order.delivery.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { orderService } from '../../config/api'
  import { useNotification } from '../../config/notification'
  import { useRoute } from 'vue-router'
  import { getImageUrl, handleImageError } from '../../config/utils'

  export default {
    name: 'DetailOrder',
    setup() {
      const route = useRoute();
      return { 
        route,
        getImageUrl,
        handleImageError
      };
    },
    data() {
      return {
        order: null,
        loading: true,
        error: null,
      };
    },
    methods: {
      /**
       * Charge les détails de la commande depuis l'API
       */
      async loadOrderDetails() {
        this.loading = true;
        this.error = null;
        
        try {
          const orderId = this.route.params.id;
          const response = await orderService.getOrder(orderId);
          
          if (response.data.success) {
            this.order = response.data.data;
          } else {
            this.error = 'Erreur lors du chargement des détails de la commande';
          }
        } catch (error) {
          console.error('Erreur lors du chargement des détails:', error);
          if (error.response?.status === 404) {
            this.error = 'Commande non trouvée';
          } else {
            this.error = 'Erreur de connexion au serveur';
          }
        } finally {
          this.loading = false;
        }
      },

      /**
       * Formate un nombre en devise (FCFA)
       */
      formatCurrency(value) {
        if (!value) return '0 FCFA';
        return new Intl.NumberFormat('fr-FR', { 
          style: 'currency', 
          currency: 'XOF',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      },

      /**
       * Formate une date
       */
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      },

      /**
       * Retourne la classe CSS appropriée pour un statut
       */
      getStatusClass(status) {
        const statusMap = {
          'paye': 'bg-green-100 text-green-800',
          'en_attente': 'bg-yellow-100 text-yellow-800',
          'annule': 'bg-red-100 text-red-800',
          'livre': 'bg-blue-100 text-blue-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
      },

      /**
       * Formate le statut pour l'affichage
       */
      formatStatus(status) {
        const statusMap = {
          'paye': 'Payé',
          'en_attente': 'En attente',
          'annule': 'Annulé',
          'livre': 'Livré',
        };
        return statusMap[status] || status;
      },

      /**
       * Formate le type de paiement
       */
      formatPaymentType(type) {
        const typeMap = {
          'en_ligne': 'Paiement en ligne',
          'especes': 'Espèces',
          'carte': 'Carte bancaire',
        };
        return typeMap[type] || type;
      },

      /**
       * Formate l'opérateur de paiement
       */
      formatOperator(operator) {
        const operatorMap = {
          'mixx_by_yas': 'Mixx by YAS',
          'moov_money': 'Moov Money',
          't_money': 'T-Money',
        };
        return operatorMap[operator] || operator;
      },

      /**
       * Formate le statut de paiement
       */
      formatPaymentStatus(status) {
        const statusMap = {
          'reussi': 'Réussi',
          'en_cours': 'En cours',
          'echoue': 'Échoué',
        };
        return statusMap[status] || status;
      },

      /**
       * Retourne la classe CSS pour le statut de paiement
       */
      getPaymentStatusClass(status) {
        const statusMap = {
          'reussi': 'bg-green-100 text-green-800',
          'en_cours': 'bg-yellow-100 text-yellow-800',
          'echoue': 'bg-red-100 text-red-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
      },


    },

    async mounted() {
      // Initialiser le service de notification
      this.$notification = useNotification();
      await this.loadOrderDetails();
    },
  };
  </script>

  <style scoped>
  /* Styles supplémentaires si nécessaire */
  </style>
  