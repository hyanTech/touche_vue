<template>
  
    <div class="p-4 md:p-6 lg:p-8">
      <!-- En-tête de la page -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Catalogue des Produits</h2>
          <p class="text-gray-500 mt-1">Gérez et consultez la liste de vos produits.</p>
        </div>
        <router-link 
          :to="{ name: 'AddProduit' }" 
          class="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center"
        >
          <i class="fas fa-plus mr-2"></i>
          Ajouter un produit
        </router-link>
      </div>

      <!-- Section des Filtres Améliorée -->
      <div class="mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Filtre de recherche -->
          <div class="lg:col-span-2">
            <label for="search" class="sr-only">Rechercher</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                v-model="searchQuery"
                placeholder="Rechercher un produit..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <!-- Filtre par catégorie -->
          <div>
            <label for="category" class="sr-only">Catégorie</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Toutes les catégories</option>
              <option v-for="category in uniqueCategories" :key="category.id" :value="category.id">
                {{ category.nom }}
              </option>
            </select>
          </div>
          <!-- Filtre par statut -->
          <div>
            <label for="status" class="sr-only">Statut</label>
            <select
              id="status"
              v-model="selectedStatus"
              class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="En stock">En stock</option>
              <option value="Stock faible">Stock faible</option>
              <option value="Rupture de stock">Rupture de stock</option>
            </select>
          </div>
        </div>
        <!-- Bouton de réinitialisation conditionnel -->
        <div class="flex justify-end mt-2 h-5" v-if="isFilterActive">
          <button @click="resetFilters" class="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Réinitialiser
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Chargement des produits...</span>
      </div>

      <!-- Conteneur du tableau pour le responsive -->
      <div v-else class="bg-white shadow-md rounded-lg overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Message si aucun résultat -->
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                <div v-if="!loading">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun produit trouvé</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ searchQuery || selectedCategory || selectedStatus ? 'Aucun produit ne correspond à vos critères.' : 'Commencez par ajouter votre premier produit.' }}
                  </p>
                </div>
              </td>
            </tr>
            <!-- Lignes de produits filtrés -->
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                                         <img 
                       class="h-10 w-10 rounded-full object-cover border border-gray-200" 
                       :src="getImageUrl(product.image_cover)"
                       :alt="'Image de ' + product.nom"
                       @error="handleImageError"
                       loading="lazy"
                     >
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.nom }}</div>
                    
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <i :class="product.category.icone" class="text-gray-400 mr-2"></i>
                  <span class="text-sm text-gray-900">{{ product.category.nom }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <!-- Si prix_promotion existe et est différent de 0, l'afficher comme prix principal -->
                  <span v-if="product.prix_promotion && product.prix_promotion > 0" class="text-red-600 font-semibold">
                    {{ formatPriceWithDecimals(product.prix_promotion) }} FCFA
                  </span>
                  <!-- Sinon afficher le prix normal -->
                  <span v-else>
                    {{ formatPriceWithDecimals(product.prix) }} FCFA
                  </span>
                  
                  <!-- Barrer le prix original si promotion active -->
                  <span v-if="product.prix_promotion && product.prix_promotion > 0" class="text-gray-500 ml-2 line-through">
                    {{ formatPriceWithDecimals(product.prix) }} FCFA
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStockStatusClass(product.stock)"
                >
                  {{ getStockStatusText(product.stock) }}
                </span>
                <div class="text-sm text-gray-500">{{ product.stock }} en stock</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end items-center space-x-2">
                  <button class="p-2 rounded-full text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200" aria-label="Modifier" @click="editProduit(product.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                    </svg>
                  </button>
                                     <button 
                     class="p-2 rounded-full text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors duration-200" 
                     aria-label="Supprimer"
                     @click="openDeleteModal(product)"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
             </div>
     </div>
     
     <!-- Modal de confirmation de suppression -->
     <DeleteConfirmationModal
       :is-open="showDeleteModal"
       :is-loading="isDeleting"
       :title="`Supprimer ${productToDelete?.nom || 'ce produit'} ?`"
       :message="`Êtes-vous sûr de vouloir supprimer le produit '${productToDelete?.nom || ''}' ? Cette action est irréversible.`"
       @confirm="handleDeleteConfirm"
       @cancel="closeDeleteModal"
     />
     
     <!-- Effet transparent sur l'arrière-plan quand le modal est ouvert -->
     <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[9998] pointer-events-none"></div>
     
 </template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { productService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'
import { getImageUrl, handleImageError, formatPriceWithDecimals, getStockStatusText, getStockStatusClass } from '../../../config/utils.js'
import DeleteConfirmationModal from '../../../components/admin/modals/DeleteConfirmationModal.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Produit',
  components: {
    
    DeleteConfirmationModal
  },
  setup() {
    const { error: showError, success: showSuccess } = useNotification()
    const router = useRouter()
    // États pour les filtres
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const selectedStatus = ref('')
    
    // États pour les données
    const products = ref([])
    const loading = ref(true)
    
    // États pour le modal de suppression
    const showDeleteModal = ref(false)
    const productToDelete = ref(null)
    const isDeleting = ref(false)
    
    // Charger les produits
    const loadProducts = async () => {
      try {
        loading.value = true
        const response = await productService.getProducts()
        products.value = response.data.data || []
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err)
        showError('Erreur lors du chargement des produits')
        products.value = []
      } finally {
        loading.value = false
      }
    }
    
    // Computed properties
    const uniqueCategories = computed(() => {
      const categories = products.value.map(p => p.category).filter(Boolean)
      return [...new Map(categories.map(cat => [cat.id, cat])).values()]
    })
    
    const isFilterActive = computed(() => {
      return searchQuery.value !== '' || selectedCategory.value !== '' || selectedStatus.value !== ''
    })
    
    const filteredProducts = computed(() => {
      let filtered = products.value

      // 1. Filtre par nom
      if (searchQuery.value) {
        filtered = filtered.filter(product =>
          product.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      // 2. Filtre par catégorie
      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.categoryId === selectedCategory.value)
      }

      // 3. Filtre par statut de stock
      if (selectedStatus.value) {
        filtered = filtered.filter(product => {
          const stockStatus = getStockStatusText(product.stock)
          return stockStatus === selectedStatus.value
        })
      }

      return filtered
    })
    

    
    const resetFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      selectedStatus.value = ''
    }
    
    // Méthodes pour la suppression
    const openDeleteModal = (product) => {
      productToDelete.value = product
      showDeleteModal.value = true
    }
    
    const closeDeleteModal = () => {
      showDeleteModal.value = false
      productToDelete.value = null
    }
    
    const handleDeleteConfirm = async () => {
      if (!productToDelete.value) return
      
      try {
        isDeleting.value = true
        await productService.deleteProduct(productToDelete.value.id)
        
        // Supprimer le produit de la liste locale
        const index = products.value.findIndex(p => p.id === productToDelete.value.id)
        if (index > -1) {
          products.value.splice(index, 1)
        }
        
        showSuccess('Produit supprimé avec succès')
        closeDeleteModal()
      } catch (err) {
        console.error('Erreur lors de la suppression du produit:', err)
        showError('Erreur lors de la suppression du produit')
      } finally {
        isDeleting.value = false
      }
    }

    const editProduit = (id) => {
      router.push({ name: 'EditProduit', params: { id } })
    }
    
    // Charger les produits au montage
    onMounted(() => {
      loadProducts()
    })
    
    return {
      // États
      searchQuery,
      selectedCategory,
      selectedStatus,
      products,
      loading,
      
      // Computed
      uniqueCategories,
      isFilterActive,
      filteredProducts,
      
                    // Méthodes
       loadProducts,
       getImageUrl,
       handleImageError,
       formatPriceWithDecimals,
       getStockStatusText,
       getStockStatusClass,
       resetFilters,
       openDeleteModal,
       closeDeleteModal,
       handleDeleteConfirm,
       showDeleteModal,
       productToDelete,
       isDeleting,
       editProduit
    }
  }
}
</script>
  