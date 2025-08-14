<template>
    
        <div class="bg-gray-100 font-sans min-h-screen">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <!-- En-tête de la page -->
                <div class="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                        Méthodes de Livraison
                    </h1>
                    <router-link 
                        :to="{ name: 'AddShipping' }" 
                        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Nouveau Type
                    </router-link>
                </div>

                <!-- Recherche -->
                <div class="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" v-model="searchQuery" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Rechercher une méthode de livraison...">
                    </div>
                </div>

                <!-- Message d'erreur -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-circle text-red-500 mr-3"></i>
                        <div>
                            <h3 class="text-sm font-medium text-red-800">Erreur</h3>
                            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                        </div>
                        <button @click="loadDeliveries" class="ml-auto text-sm text-red-600 hover:text-red-800">
                            <i class="fas fa-redo mr-1"></i>Réessayer
                        </button>
                    </div>
                </div>

                <!-- Conteneur pour la liste (tableau et cartes) -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <!-- Loading State -->
                    <div v-if="isLoading" class="text-center py-12">
                        <i class="fas fa-spinner fa-spin text-blue-600 text-4xl mb-4"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Chargement des méthodes de livraison...</h3>
                        <p class="text-gray-500">Veuillez patienter</p>
                    </div>

                                        <!-- Vue Tableau pour Desktop -->
                    <div class="hidden md:block">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr class="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <th class="px-5 py-3">Nom</th>
                                    <th class="px-5 py-3">Zones</th>
                                    <th class="px-5 py-3 text-right">Prix</th>
                                    <th class="px-5 py-3 text-center">Statut</th>
                                    <th class="px-5 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr v-if="filteredShippingTypes.length === 0">
                                    <td colspan="5" class="text-center py-10 text-gray-500">Aucun type de livraison trouvé.</td>
                                </tr>
                                <tr v-for="shippingType in filteredShippingTypes" :key="shippingType.id" class="border-b border-gray-200 hover:bg-gray-100">
                                    <td class="px-5 py-4">
                                        <p class="font-bold">{{ shippingType.nom }}</p>
                                        <p class="text-sm text-gray-600">{{ shippingType.description || 'Aucune description' }}</p>
                                    </td>
                                    <td class="px-5 py-4">
                                        <div class="flex flex-wrap gap-1">
                                            <span v-for="zone in shippingType.zone" :key="zone" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {{ zone }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-5 py-4 text-right">
                                        <p>{{ parseFloat(shippingType.prix).toLocaleString('fr-FR') }} CFA</p>
                                    </td>
                                    <td class="px-5 py-4 text-center">
                                       <button @click="toggleStatus(shippingType)" :class="shippingType.etat ? 'bg-green-500' : 'bg-gray-300'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                         <span :class="shippingType.etat ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                        </button>
                                    </td>
                                                                         <td class="px-5 py-4 text-center">
                                         <router-link :to="{ name: 'EditShipping', params: { id: shippingType.id } }" class="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">Modifier</router-link>
                                         <button @click="deleteDelivery(shippingType)" class="text-red-600 hover:text-red-900 font-medium">Supprimer</button>
                                     </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Vue Cartes pour Mobile -->
                    <div class="md:hidden">
                         <div v-if="filteredShippingTypes.length === 0" class="text-center py-10 text-gray-500">
                            Aucun type de livraison trouvé.
                         </div>
                        <div v-for="shippingType in filteredShippingTypes" :key="`card-${shippingType.id}`" class="border-b border-gray-200 p-4">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <p class="font-bold text-gray-800">{{ shippingType.nom }}</p>
                                    <p class="text-sm text-gray-600">{{ parseFloat(shippingType.prix).toLocaleString('fr-FR') }} CFA</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button @click="toggleStatus(shippingType)" :class="shippingType.etat ? 'bg-green-500' : 'bg-gray-300'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none">
                                         <span :class="shippingType.etat ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                      </button>
                                    <span class="text-sm font-medium" :class="shippingType.etat ? 'text-green-700' : 'text-gray-500'">
                                        {{ shippingType.etat ? 'Actif' : 'Inactif' }}
                                    </span>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 mb-3">{{ shippingType.description || 'Aucune description' }}</p>
                            <div class="flex flex-wrap gap-1 mb-4">
                                <span v-for="zone in shippingType.zone" :key="zone" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {{ zone }}
                                </span>
                            </div>
                                                         <div class="flex gap-4">
                                 <router-link :to="{ name: 'EditShipping', params: { id: shippingType.id } }" class="text-sm font-medium text-indigo-600 hover:text-indigo-800">Modifier</router-link>
                                 <button @click="deleteDelivery(shippingType)" class="text-sm font-medium text-red-600 hover:text-red-800">Supprimer</button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { deliveryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'

export default {
    name: 'ShippingTypes',
    components: {
        
    },
    setup() {
        const { success, error: showError } = useNotification()
        
        const searchQuery = ref('')
        const shippingTypes = ref([])
        const isLoading = ref(false)
        const error = ref('')

        // Charger les méthodes de livraison
        const loadDeliveries = async () => {
            isLoading.value = true
            error.value = ''
            
            try {
                const response = await deliveryService.getDeliveries()
                console.log(response.data.data)
                
                // Parser les champs JSON pour chaque méthode de livraison
                shippingTypes.value = (response.data.data || []).map(delivery => {
                    let zones = []
                    
                    try {
                        if (delivery.zone && delivery.zone !== "[]") {
                            if (typeof delivery.zone === 'string') {
                                zones = JSON.parse(delivery.zone)
                            } else if (Array.isArray(delivery.zone)) {
                                zones = delivery.zone
                            }
                        }
                    } catch (parseError) {
                        console.warn('Erreur lors du parsing JSON pour la zone:', delivery.id, parseError)
                        zones = []
                    }
                    
                    return {
                        ...delivery,
                        zone: zones
                    }
                })
                
                console.log('Méthodes de livraison parsées:', shippingTypes.value)
            } catch (err) {
                console.error('Erreur lors du chargement des méthodes de livraison:', err)
                error.value = 'Erreur lors du chargement des méthodes de livraison'
                showError('Erreur lors du chargement des méthodes de livraison')
                shippingTypes.value = []
            } finally {
                isLoading.value = false
            }
        }

        // Filtre les types de livraison en fonction de la recherche
        const filteredShippingTypes = computed(() => {
            if (!searchQuery.value) {
                return shippingTypes.value
            }
            const search = searchQuery.value.toLowerCase()
            return shippingTypes.value.filter(type =>
                type.nom.toLowerCase().includes(search) ||
                (type.description && type.description.toLowerCase().includes(search))
            )
        })

        // Méthode pour basculer le statut d'un type de livraison
        const toggleStatus = async (shippingType) => {
            try {
                await deliveryService.updateDelivery(shippingType.id, {
                    etat: !shippingType.etat
                })
                shippingType.etat = !shippingType.etat
                
                success(
                    `Le statut de "${shippingType.nom}" a été ${shippingType.etat ? 'activé' : 'désactivé'} avec succès.`,
                    'Statut mis à jour'
                )
            } catch (err) {
                console.error('Erreur lors de la mise à jour du statut:', err)
                showError('Erreur lors de la mise à jour du statut de la méthode de livraison')
            }
        }

        // Méthode pour supprimer une méthode de livraison
        const deleteDelivery = async (shippingType) => {
            if (confirm(`Êtes-vous sûr de vouloir supprimer la méthode de livraison "${shippingType.nom}" ?`)) {
                try {
                    await deliveryService.deleteDelivery(shippingType.id)
                    const index = shippingTypes.value.findIndex(d => d.id === shippingType.id)
                    if (index > -1) {
                        shippingTypes.value.splice(index, 1)
                    }
                    
                    success(
                        `La méthode de livraison "${shippingType.nom}" a été supprimée avec succès.`,
                        'Méthode supprimée'
                    )
                } catch (err) {
                    console.error('Erreur lors de la suppression:', err)
                    showError('Erreur lors de la suppression de la méthode de livraison')
                }
            }
        }

        onMounted(() => {
            loadDeliveries()
        })

        return {
            searchQuery,
            shippingTypes,
            isLoading,
            error,
            filteredShippingTypes,
            toggleStatus,
            deleteDelivery,
            loadDeliveries
        }
    }
}
</script>

<style scoped>
/* Le style est principalement géré par Tailwind CSS, mais on peut ajouter des styles spécifiques ici si besoin. */
</style>
