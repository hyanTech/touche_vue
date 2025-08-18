<template>
    <!-- Conteneur principal -->
    <div class="bg-gray-100 font-sans min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">
          Gestion des Commandes
        </h1>
  
        <!-- Section des filtres -->
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Filtre par Numéro de commande -->
            <div>
              <label for="filter-order-number" class="block text-sm font-medium text-gray-700 mb-1">Numéro de commande</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                </div>
                <input type="text" v-model="filters.numeroCommande" id="filter-order-number" placeholder="Rechercher..." class="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>
            
            <!-- Filtre par État avec style amélioré -->
            <div>
              <label for="filter-status" class="block text-sm font-medium text-gray-700 mb-1">État</label>
              <div class="relative">
                <select v-model="filters.etat" id="filter-status" class="appearance-none block w-full py-2 px-3 pr-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <option value="">Tous les états</option>
                  <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>
  
            <!-- Filtre par Type de paiement avec style amélioré -->
            <div>
              <label for="filter-payment" class="block text-sm font-medium text-gray-700 mb-1">Type de paiement</label>
              <div class="relative">
                <select v-model="filters.typePaiement" id="filter-payment" class="appearance-none block w-full py-2 px-3 pr-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <option value="">Tous les types</option>
                  <option v-for="paymentType in paymentOptions" :key="paymentType" :value="paymentType">{{ paymentType }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>
  
            <!-- Filtre par Date -->
            <div>
               <label for="filter-date" class="block text-sm font-medium text-gray-700 mb-1">Date de commande</label>
              <div class="relative">
                 <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 </div>
                <input type="date" v-model="filters.date" id="filter-date" class="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>
          </div>
           <div class="mt-6 flex justify-end">
              <button @click="resetFilters" class="flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200">
                  <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
                  Réinitialiser
              </button>
          </div>
        </div>
  
        <!-- Tableau des commandes -->
        <div class="bg-white rounded-xl shadow-lg overflow-x-auto">
          <div class="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p class="text-sm text-gray-600 flex items-center">
              <i class="fas fa-info-circle mr-2 text-blue-500"></i>
              Cliquez sur une ligne pour voir les détails de la commande
            </p>
          </div>
          <table class="w-full min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Loading state -->
              <tr v-if="loading">
                <td colspan="7" class="text-center py-10">
                  <div class="flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="ml-2 text-gray-600">Chargement des commandes...</span>
                  </div>
                </td>
              </tr>
              
              <!-- Error state -->
              <tr v-else-if="error">
                <td colspan="7" class="text-center py-10 text-red-600">
                  <div class="flex items-center justify-center">
                    <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ error }}
                  </div>
                </td>
              </tr>
              
              <!-- Orders data -->
              <tr v-else v-for="order in filteredOrders" :key="order.id" 
                  class="hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer group"
                  @click="viewOrder(order.id)">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 group-hover:text-blue-600 transition-colors">
                  <div class="flex items-center">
                    <span>{{ order.numero_commande }}</span>
                    <i class="fas fa-chevron-right ml-2 text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDate(order.createdAt) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div class="group-hover:text-blue-600 transition-colors">{{ order.nom_client }} {{ order.prenom_client }}</div>
                  <div class="text-xs text-gray-500">{{ order.email_client }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{{ formatCurrency(order.montant_final) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{{ order.type_paiement }}</td>
                <td class="px-6 py-4 whitespace-nowrap" @click.stop>
                  <button v-if="order.etat === 'payement_a_la_livraison'" @click="openStatusModal(order)" :class="getStatusClasses(order.etat)" class="w-full text-left px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 transition-all">
                    {{ order.etat }}
                  </button>
                  <span v-else :class="getStatusClasses(order.etat)" class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ order.etat }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" @click.stop>
                    <div class="flex items-center justify-center space-x-3">
                        <button @click="viewOrder(order.id)" title="Voir les détails" class="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                        <!-- <button @click="editOrder(order.id)" title="Modifier la commande" class="p-2 rounded-full text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg></button>
                        <button @click="openDeleteModal(order)" title="Supprimer la commande" class="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                     -->
                    </div>
                </td>
              </tr>
              <tr v-if="!loading && !error && filteredOrders.length === 0"><td colspan="7" class="text-center py-10 text-gray-500">Aucune commande trouvée.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Modale pour changer l'état avec fond flouté -->
      <transition name="modal-fade">
        <div v-if="isStatusModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
          <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Changer l'état de la commande</h3>
            <p class="text-sm text-gray-500 mt-1">Commande N°: {{ orderToEdit.numero_commande }}</p>
            <div class="mt-4">
              <label for="new-status" class="block text-sm font-medium text-gray-700">Nouvel état</label>
              <div class="relative mt-1">
                  <select v-model="newStatus" id="new-status" class="appearance-none block w-full py-2 px-3 pr-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button @click="closeStatusModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Annuler</button>
              <button @click="updateOrderStatus" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Enregistrer</button>
            </div>
          </div>
        </div>
      </transition>
  
      <!-- Modale de confirmation de suppression avec fond flouté -->
      <transition name="modal-fade">
          <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
              <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                  <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 class="text-lg leading-6 font-medium text-gray-900">Supprimer la commande</h3>
                          <div class="mt-2">
                              <p class="text-sm text-gray-500">Êtes-vous sûr de vouloir supprimer la commande <strong>{{ orderToEdit.numero_commande }}</strong> ? Cette action est irréversible.</p>
                          </div>
                      </div>
                  </div>
                  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button @click="confirmDelete" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Supprimer</button>
                      <button @click="closeDeleteModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">Annuler</button>
                  </div>
              </div>
          </div>
      </transition>
  
    </div>
  </template>
  
  <script>
  import { orderService } from '../../config/api'
  import { useNotification } from '../../config/notification'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'OrdersList',
    setup() {
      const router = useRouter();
      return { router };
    },
    data() {
      return {
        isStatusModalOpen: false,
        isDeleteModalOpen: false,
        orderToEdit: null,
        newStatus: '',
        filters: { numeroCommande: '', etat: '', typePaiement: '', date: '' },
        orders: [],
        loading: false,
        error: null,
      };
    },

    


    computed: {
      filteredOrders() {
        let filtered = this.orders;
        if (this.filters.numeroCommande) {
          filtered = filtered.filter(order => order.numero_commande.toLowerCase().includes(this.filters.numeroCommande.toLowerCase()));
        }
        if (this.filters.etat) {
          filtered = filtered.filter(order => order.etat === this.filters.etat);
        }
        if (this.filters.typePaiement) {
          filtered = filtered.filter(order => order.type_paiement === this.filters.typePaiement);
        }
        if (this.filters.date) {
          filtered = filtered.filter(order => this.formatDateForFilter(order.createdAt) === this.filters.date);
        }
        return filtered;
      },
      statusOptions() {
          // États disponibles pour la modification (selon l'API)
          return ['annule', 'livre'];
      },
      paymentOptions() {
          return [...new Set(this.orders.map(order => order.type_paiement))];
      }
    },
    methods: {
      // Charger les commandes depuis l'API
      async loadOrders() {
        this.loading = true;
        this.error = null;
        try {
          const response = await orderService.getOrders();
          if (response.data.success) {
            this.orders = response.data.data;
          } else {
            this.error = 'Erreur lors du chargement des commandes';
            this.$notification.error('Erreur lors du chargement des commandes');
          }
        } catch (error) {
          console.error('Erreur lors du chargement des commandes:', error);
          this.error = 'Erreur de connexion au serveur';
          this.$notification.error('Erreur de connexion au serveur');
        } finally {
          this.loading = false;
        }
      },

      getStatusClasses(status) {
        const statusClassMap = {
          'paye': 'bg-green-100 text-green-800',
          'en_attente': 'bg-yellow-100 text-yellow-800',
          'annule': 'bg-red-100 text-red-800',
          'livre': 'bg-blue-100 text-blue-800',
          'payement_a_la_livraison': 'bg-blue-100 text-blue-800',
          'paiement_echoue': 'bg-red-100 text-red-800',
        };
        return statusClassMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
      },

      formatCurrency(value) {
        return new Intl.NumberFormat('fr-FR', { 
          style: 'currency', 
          currency: 'XOF',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      },

      formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      },

      formatDateForFilter(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
      },

             viewOrder(orderId) { 
         this.$router.push(`/admin/orders/detail_order/${orderId}`); 
       },

       editOrder(orderId) { 
         this.$notification.info(`Modification de la commande ID : ${orderId}`); 
       },

      resetFilters() { 
        this.filters = { numeroCommande: '', etat: '', typePaiement: '', date: '' }; 
      },

      openStatusModal(order) {
        this.orderToEdit = order;
        this.newStatus = order.etat;
        this.isStatusModalOpen = true;
      },

      closeStatusModal() {
        this.isStatusModalOpen = false;
        this.orderToEdit = null;
      },

             async updateOrderStatus() {
         try {
           console.log('Mise à jour du statut:', {
             numero_commande: this.orderToEdit.numero_commande,
             etat: this.newStatus
           });

           // Appel API pour mettre à jour le statut
           const response = await orderService.updateOrderStatus(
             this.orderToEdit.numero_commande,
             this.newStatus
           );

           console.log('Réponse API mise à jour statut:', response);

           if (response.data.success) {
             // Mettre à jour l'état local
             const orderIndex = this.orders.findIndex(o => o.id === this.orderToEdit.id);
             if (orderIndex !== -1) {
               this.orders[orderIndex].etat = this.newStatus;
             }
             
             // Afficher un message de succès
             this.$notification.success('Statut mis à jour avec succès !');
             this.closeStatusModal();
           } else {
             this.$notification.error(response.data.message || 'Erreur lors de la mise à jour du statut');
           }
         } catch (error) {
           console.error('Erreur détaillée lors de la mise à jour du statut:', error);
           
           if (error.response) {
             // Erreur de réponse du serveur
             console.error('Status:', error.response.status);
             console.error('Data:', error.response.data);
             
             if (error.response.status === 400) {
               this.$notification.error(`Erreur de validation: ${error.response.data.message || 'Données invalides'}`);
             } else if (error.response.status === 404) {
               this.$notification.error('Commande non trouvée');
             } else if (error.response.status === 500) {
               this.$notification.error('Erreur serveur - Veuillez réessayer');
             } else {
               this.$notification.error(`Erreur ${error.response.status}: ${error.response.data?.message || 'Erreur lors de la mise à jour'}`);
             }
           } else if (error.request) {
             // Erreur de requête (pas de réponse)
             this.$notification.error('Impossible de se connecter au serveur');
           } else {
             // Autre erreur
             this.$notification.error(`Erreur: ${error.message}`);
           }
         }
       },

      openDeleteModal(order) {
        this.orderToEdit = order;
        this.isDeleteModalOpen = true;
      },

      closeDeleteModal() {
        this.isDeleteModalOpen = false;
        this.orderToEdit = null;
      },

             async confirmDelete() {
         try {
           // Ici vous pouvez ajouter l'appel API pour supprimer la commande
           // await orderService.deleteOrder(this.orderToEdit.id);
           
           this.orders = this.orders.filter(o => o.id !== this.orderToEdit.id);
           this.$notification.success('Commande supprimée avec succès');
           this.closeDeleteModal();
         } catch (error) {
           console.error('Erreur lors de la suppression:', error);
           this.$notification.error('Erreur lors de la suppression de la commande');
         }
       }
    },

         // Hook de cycle de vie
     async mounted() {
       // Initialiser le service de notification
       this.$notification = useNotification();
       await this.loadOrders();
     },
    
  }
  </script>
  
  <style>
  /* Styles pour la transition de la modale */
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
  