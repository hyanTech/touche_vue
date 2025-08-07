<template>
    
        <!-- Content specific to categories -->
        <div class="flex justify-between items-center mb-6">
            <router-link 
                :to="{ name: 'AddCategory' }" 
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
                <i class="fas fa-plus mr-2"></i>
                Nouvelle Catégorie
            </router-link>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Search -->
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400"></i>
                    </div>
                    <input
                        v-model="searchQuery"
                        type="text"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Rechercher une catégorie..."
                    />
                </div>

                <!-- Status Filter -->
                <div class="relative">
                    <select
                        v-model="statusFilter"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="active">Actives</option>
                        <option value="inactive">Inactives</option>
                    </select>
                </div>

                <!-- Sort by -->
                <div class="relative">
                    <select
                        v-model="sortBy"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="nom">Trier par nom</option>
                        <option value="status">Trier par statut</option>
                    </select>
                </div>
            </div>
        </div>



        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-exclamation-circle text-red-500 mr-3"></i>
                <div>
                    <h3 class="text-sm font-medium text-red-800">Erreur</h3>
                    <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                </div>
                <button @click="loadCategories" class="ml-auto text-sm text-red-600 hover:text-red-800">
                    <i class="fas fa-redo mr-1"></i>Réessayer
                </button>
            </div>
        </div>

        <!-- Categories Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold text-gray-800">Liste des Catégories</h2>
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-500">{{ filteredCategories.length }} catégorie(s)</span>
                        <button 
                            @click="loadCategories" 
                            :disabled="isLoading"
                            class="text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                        >
                            <i class="fas fa-sync-alt mr-1" :class="{ 'fa-spin': isLoading }"></i>
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Catégorie
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Icône
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="category in filteredCategories" :key="category.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <!-- Gestion des différents types d'icônes -->
                                            <template v-if="category.icone.startsWith('fas ') || category.icone.startsWith('fa ') || category.icone.startsWith('far ') || category.icone.startsWith('fab ')">
                                                <i :class="category.icone" class="text-indigo-600"></i>
                                            </template>
                                            <template v-else>
                                                <span class="text-lg">{{ category.icone }}</span>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ category.nom }}</div>
                                        <div class="text-sm text-gray-500">{{ category.description || 'Aucune description' }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center justify-center">
                                    <!-- Gestion des différents types d'icônes -->
                                    <template v-if="category.icone.startsWith('fas ') || category.icone.startsWith('fa ') || category.icone.startsWith('far ') || category.icone.startsWith('fab ')">
                                        <i :class="category.icone" class="text-xl text-indigo-600"></i>
                                    </template>
                                    <template v-else>
                                        <span class="text-2xl">{{ category.icone }}</span>
                                    </template>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                    category.status 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                ]">
                                    {{ category.status ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="relative">
                                    <button 
                                        @click="toggleDropdown(category.id)"
                                        class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                    >
                                        <i class="fas fa-cog mr-1.5"></i>
                                        Actions
                                        <i class="fas fa-chevron-down ml-1.5 text-xs"></i>
                                    </button>
                                    
                                    <!-- Dropdown Menu -->
                                    <div 
                                        v-if="activeDropdown === category.id"
                                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                                    >
                                        <button 
                                            @click="editCategory(category)"
                                            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <i class="fas fa-edit mr-2"></i>Modifier
                                        </button>
                                        <button 
                                            @click="toggleStatus(category)"
                                            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <i :class="category.status ? 'fas fa-pause' : 'fas fa-play'" class="mr-2"></i>
                                            {{ category.status ? 'Désactiver' : 'Activer' }}
                                        </button>
                                        <hr class="my-1">
                                        <button 
                                            @click="deleteCategory(category)"
                                            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            <i class="fas fa-trash mr-2"></i>Supprimer
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-indigo-600 text-4xl mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Chargement des catégories...</h3>
                <p class="text-gray-500">Veuillez patienter</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredCategories.length === 0" class="text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune catégorie trouvée</h3>
                <p class="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
        </div>
    
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'

export default {
    name: 'CategoryPage',
    components: {
        
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const { success, error: showError } = useNotification()
        
        // Search and filter states
        const searchQuery = ref('')
        const statusFilter = ref('')
        const sortBy = ref('nom')
        const activeDropdown = ref(null)
        const isLoading = ref(false)
        const error = ref('')


        // Categories data
        const categories = ref([])

        // Computed properties
        const filteredCategories = computed(() => {
            // S'assurer que categories.value est un tableau
            let filtered = Array.isArray(categories.value) ? categories.value : []

            // Search filter
            if (searchQuery.value) {
                filtered = filtered.filter(category => 
                    category.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    (category.description && category.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
                )
            }

            // Status filter
            if (statusFilter.value) {
                filtered = filtered.filter(category => {
                    if (statusFilter.value === 'active') return category.status === true
                    if (statusFilter.value === 'inactive') return category.status === false
                    return true
                })
            }

            // Sort
            filtered.sort((a, b) => {
                switch (sortBy.value) {
                    case 'nom':
                        return a.nom.localeCompare(b.nom)
                    case 'status':
                        return a.status === b.status ? 0 : a.status ? -1 : 1
                    default:
                        return 0
                }
            })

            return filtered
        })

        // Methods
        const loadCategories = async () => {
            isLoading.value = true
            error.value = ''
            
            try {
                const response = await categoryService.getCategories()
                // L'API renvoie { success: true, data: [...] }
                categories.value = Array.isArray(response.data.data) ? response.data.data : []
            } catch (err) {
                console.error('Erreur lors du chargement des catégories:', err)
                error.value = 'Erreur lors du chargement des catégories'
                showError('Erreur lors du chargement des catégories')
                // En cas d'erreur, initialiser avec un tableau vide
                categories.value = []
            } finally {
                isLoading.value = false
            }
        }

        const toggleDropdown = (id) => {
            activeDropdown.value = activeDropdown.value === id ? null : id
        }

        const editCategory = (category) => {
            // Navigation vers la page d'édition avec l'ID de la catégorie
            router.push({ name: 'EditCategory', params: { id: category.id } })
            activeDropdown.value = null
        }

        const toggleStatus = async (category) => {
            try {
                const newStatus = !category.status
                await categoryService.updateCategory(category.id, { status: newStatus })
                category.status = newStatus
                activeDropdown.value = null
                
                // Notification de succès
                success(
                    `La catégorie "${category.nom}" a été ${newStatus ? 'activée' : 'désactivée'} avec succès.`,
                    'Statut mis à jour'
                )
            } catch (err) {
                console.error('Erreur lors de la mise à jour du statut:', err)
                showError('Erreur lors de la mise à jour du statut de la catégorie')
            }
        }

        const deleteCategory = async (category) => {
            if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.nom}" ?`)) {
                try {
                    await categoryService.deleteCategory(category.id)
                    const index = categories.value.findIndex(c => c.id === category.id)
                    if (index > -1) {
                        categories.value.splice(index, 1)
                    }
                    
                    // Notification de succès
                    success(
                        `La catégorie "${category.nom}" a été supprimée avec succès.`,
                        'Catégorie supprimée'
                    )
                } catch (err) {
                    console.error('Erreur lors de la suppression:', err)
                    showError('Erreur lors de la suppression de la catégorie')
                }
            }
            activeDropdown.value = null
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (!event.target.closest('.relative')) {
                activeDropdown.value = null
            }
        }

        onMounted(() => {
            document.addEventListener('click', handleClickOutside)
            loadCategories()
            
            
        })

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside)
        })

        return {
            searchQuery,
            statusFilter,
            sortBy,
            activeDropdown,
            isLoading,
            error,

            categories,
            filteredCategories,
            loadCategories,
            toggleDropdown,
            editCategory,
            toggleStatus,
            deleteCategory
        }
    }
}
</script>

<style scoped>
/* Custom styles for better table appearance */
.table-container {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Smooth transitions for hover effects */
tr {
    transition: background-color 0.2s ease-in-out;
}

/* Better dropdown styling */
.dropdown-menu {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>