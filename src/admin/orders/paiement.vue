<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Historique des Paiements</h1>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span class="ml-3 text-gray-600">Chargement des paiements...</span>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">Erreur lors du chargement</h3>
                        <div class="mt-2 text-sm text-red-700">
                            {{ error }}
                        </div>
                        <div class="mt-4">
                            <button @click="loadPayments" class="text-sm font-medium text-red-800 hover:text-red-900">
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div v-else>
                <!-- Filter Section -->
                <div class="mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <!-- Filter by Order ID -->
                        <div class="md:col-span-2">
                            <label for="orderIdFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrer par N°
                                de commande</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" v-model="searchOrderId" id="orderIdFilter"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm pl-10 pr-4 py-2 text-base focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Rechercher...">
                            </div>
                        </div>
                        <!-- Filter by Date -->
                        <div class="md:col-span-2">
                            <label for="dateFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrer par
                                date</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <!-- Input : Date -->
                                <input type="date" v-model="searchDate" id="dateFilter"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm pl-10 pr-4 py-2 text-base focus:border-blue-500 focus:ring-blue-500">

                            </div>
                        </div>
                        <!-- Reset Button -->
                        <div class="md:col-span-1">
                            <button @click="clearFilters"
                                class="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Réinitialiser
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Payment List Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-600">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Date</th>
                                    <th scope="col" class="px-6 py-3">Numéro de Commande</th>
                                    <th scope="col" class="px-6 py-3">Client</th>
                                    <th scope="col" class="px-6 py-3">Numéro de Transaction</th>
                                    <th scope="col" class="px-6 py-3">Montant Payé</th>
                                    <th scope="col" class="px-6 py-3">Opérateur</th>
                                    <th scope="col" class="px-6 py-3">Numéro Téléphone</th>
                                    <th scope="col" class="px-6 py-3">État</th>
                                    <th scope="col" class="px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Loop through filtered payments -->
                                <tr v-for="payment in filteredPayments" :key="payment.id"
                                    class="bg-white border-b hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        {{ formatDate(payment.date_paiement) }}
                                    </td>
                                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {{ payment.order?.numero_commande || 'N/A' }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ getClientName(payment.order) }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ payment.numero_transaction }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ formatAmount(payment.montant_paye) }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ formatOperator(payment.operateur_paiement) }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ payment.numero_telephone }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <!-- Status Badge -->
                                        <span :class="getStatusClass(payment.statut)"
                                            class="px-3 py-1 text-xs font-semibold rounded-full">
                                            {{ formatStatus(payment.statut) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <!-- Action Button -->
                                        <button @click="viewDetails(payment)"
                                            class="font-medium text-blue-600 hover:underline">
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                                <!-- Empty state for filtered results -->
                                <tr v-if="!filteredPayments.length && !loading">
                                    <td colspan="9" class="text-center py-10 text-gray-500">
                                        Aucun paiement ne correspond à vos critères de recherche.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="pagination && pagination.totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <button @click="changePage(pagination.currentPage - 1)" 
                                :disabled="pagination.currentPage <= 1"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Précédent
                            </button>
                            <button @click="changePage(pagination.currentPage + 1)"
                                :disabled="pagination.currentPage >= pagination.totalPages"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Suivant
                            </button>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Affichage de <span class="font-medium">{{ (pagination.currentPage - 1) * pagination.itemsPerPage + 1 }}</span> à 
                                    <span class="font-medium">{{ Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) }}</span> sur 
                                    <span class="font-medium">{{ pagination.totalItems }}</span> résultats
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button @click="changePage(pagination.currentPage - 1)"
                                        :disabled="pagination.currentPage <= 1"
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span class="sr-only">Précédent</span>
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button v-for="page in getPageNumbers()" :key="page"
                                        @click="changePage(page)"
                                        :class="page === pagination.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                        {{ page }}
                                    </button>
                                    <button @click="changePage(pagination.currentPage + 1)"
                                        :disabled="pagination.currentPage >= pagination.totalPages"
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span class="sr-only">Suivant</span>
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { paymentService } from '../../config/api'

export default {
    name: 'Paiement',
    data() {
        return {
            // Filter data properties
            searchOrderId: '',
            searchDate: '',
            // API data
            payments: [],
            pagination: null,
            loading: false,
            error: null,
            currentPage: 1
        };
    },
    computed: {
        /**
         * Filters the payments based on searchOrderId and searchDate.
         * @returns {Array} The filtered list of payments.
         */
        filteredPayments() {
            let filtered = this.payments;

            // Filter by Order ID (case-insensitive)
            if (this.searchOrderId) {
                filtered = filtered.filter(p =>
                    p.order?.numero_commande?.toLowerCase().includes(this.searchOrderId.toLowerCase())
                );
            }

            // Filter by Date
            if (this.searchDate) {
                filtered = filtered.filter(p => {
                    const paymentDate = new Date(p.date_paiement).toISOString().split('T')[0];
                    return paymentDate === this.searchDate;
                });
            }

            return filtered;
        }
    },
    async mounted() {
        await this.loadPayments();
    },
    methods: {
        /**
         * Charge les paiements depuis l'API
         */
        async loadPayments() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await paymentService.getAllPayments({
                    page: this.currentPage
                });
                
                if (response.data.success) {
                    this.payments = response.data.data;
                    this.pagination = response.data.pagination;
                } else {
                    this.error = 'Erreur lors du chargement des paiements';
                }
            } catch (error) {
                console.error('Erreur lors du chargement des paiements:', error);
                this.error = error.response?.data?.message || 'Erreur de connexion au serveur';
            } finally {
                this.loading = false;
            }
        },

        /**
         * Change de page
         */
        async changePage(page) {
            if (page >= 1 && page <= this.pagination.totalPages) {
                this.currentPage = page;
                await this.loadPayments();
            }
        },

        /**
         * Génère les numéros de page pour la pagination
         */
        getPageNumbers() {
            const pages = [];
            const totalPages = this.pagination.totalPages;
            const currentPage = this.pagination.currentPage;
            
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);
            
            if (end - start < 4) {
                if (start === 1) {
                    end = Math.min(totalPages, start + 4);
                } else {
                    start = Math.max(1, end - 4);
                }
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            return pages;
        },

        /**
         * Retourne la classe CSS appropriée pour le statut du paiement.
         * @param {string} status - Le statut du paiement.
         * @returns {string} - Les classes Tailwind CSS.
         */
        getStatusClass(status) {
            switch (status?.toLowerCase()) {
                case 'reussi':
                    return 'bg-green-100 text-green-800';
                case 'en_attente':
                case 'en attente':
                    return 'bg-yellow-100 text-yellow-800';
                case 'echoue':
                case 'échoué':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        },

        /**
         * Formate le statut pour l'affichage
         */
        formatStatus(status) {
            switch (status?.toLowerCase()) {
                case 'reussi':
                    return 'Succès';
                case 'en_attente':
                case 'en attente':
                    return 'En attente';
                case 'echoue':
                case 'échoué':
                    return 'Échoué';
                default:
                    return status || 'Inconnu';
            }
        },

        /**
         * Formate l'opérateur de paiement pour l'affichage
         */
        formatOperator(operator) {
            switch (operator?.toLowerCase()) {
                case 'moov_money':
                    return 'Moov Money';
                case 'tmoney':
                case 't-money':
                    return 'T-Money';
                case 'flooz':
                    return 'Flooz';
                case 'mixx_by_yas':
                    return 'Mixx by YAS';
                default:
                    return operator || 'Inconnu';
            }
        },

        /**
         * Formate le montant pour l'affichage
         */
        formatAmount(amount) {
            if (!amount) return '0 FCFA';
            const numAmount = parseFloat(amount);
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(numAmount);
        },

        /**
         * Formate une chaîne de date ISO en format lisible (DD/MM/YYYY).
         * @param {string} dateString - La chaîne de date ISO (ex: '2024-07-28T12:38:37.000Z').
         * @returns {string} - La date formatée.
         */
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        },

        /**
         * Obtient le nom complet du client
         */
        getClientName(order) {
            if (!order) return 'N/A';
            const nom = order.nom_client || '';
            const prenom = order.prenom_client || '';
            return `${nom} ${prenom}`.trim() || 'N/A';
        },

        /**
         * Placeholder function to view payment details.
         * @param {object} payment - The payment object.
         */
        viewDetails(payment) {
            // In a real app, this would likely navigate to a detail page
            // or open a modal with more information.
            console.log('Viewing details for:', payment);
            alert(`Détails pour la transaction ${payment.numero_transaction}\n\nClient: ${this.getClientName(payment.order)}\nMontant: ${this.formatAmount(payment.montant_paye)}\nOpérateur: ${this.formatOperator(payment.operateur_paiement)}\nStatut: ${this.formatStatus(payment.statut)}`);
        },

        /**
         * Resets all filter fields to their default empty state.
         */
        clearFilters() {
            this.searchOrderId = '';
            this.searchDate = '';
        }
    },
};
</script>

<style scoped>
/* Custom style to make the date picker icon visible */
input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>