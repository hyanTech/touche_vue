<template>
  <!-- Bandeau de livraison gratuite -->
  <div class="bg-primary text-white py-2 overflow-hidden">
          <div class="scrolling-text">
        <div class="text-container">
          <span class="text-item">Livraison gratuite pour les commandes de plus de 50.000f</span>
          <span class="text-item">Livraison des commandes dans un délai de 24h à 48h</span>
        </div>
      </div>
  </div>

  <header class="bg-accent shadow-md sticky top-0 z-40">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main container using justify-between for left and right sections -->
      <div class="relative flex items-center justify-between h-20">
        
        <!-- LEFT SECTION: Hamburger on mobile, Logo on desktop -->
        <div class="flex items-center">
          <!-- Hamburger Menu Icon (visible below 'md') -->
          <button @click="$emit('toggle-sidebar')" class="md:hidden text-text-secondary hover:text-[#443627] cursor-pointer p-2">
            <i class="fas fa-bars text-2xl h-7 w-7"></i>
          </button>
          <!-- Desktop Logo (visible from 'md' upwards) -->
          <router-link to="/" class="hidden md:flex items-center">
            <img src="/src/assets/logo.png" alt="Logo" class="h-32 w-auto" onerror="this.style.display='none'">
          </router-link>
        </div>

        <!-- MOBILE LOGO (CENTER): Centered, visible only below 'md' -->
        <div class="absolute left-1/2 -translate-x-1/2 md:hidden">
            <router-link to="/" class="flex items-center">
              <img src="/src/assets/logo.png" alt="Logo" class="h-32 w-auto" onerror="this.style.display='none'">
            </router-link>
        </div>

        <!-- RIGHT SECTION: Contains navigation links and remaining icons -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Desktop Navigation Menu (visible from 'md' upwards) -->
          <div class="hidden md:flex md:items-center md:space-x-1">
            <div v-for="link in menuWithCategories" :key="link.name" class="relative group">
              <router-link 
                :to="link.href" 
                class="px-4 py-2 text-text-secondary hover:text-[#443627] transition duration-150 flex items-center cursor-pointer"
                v-if="!link.sublinks || link.sublinks.length === 0"
              >
                <i v-if="link.icon" :class="link.icon" class="mr-2"></i>
                {{ link.name }}
                <span v-if="link.badge" class="ml-2 bg-error-color text-white text-xs px-2 py-1 rounded-full">{{ link.badge }}</span>
              </router-link>
              <div 
                v-else
                class="px-4 py-2 text-text-secondary hover:text-[#443627] transition duration-150 flex items-center cursor-pointer"
              >
                <i v-if="link.icon" :class="link.icon" class="mr-2"></i>
                {{ link.name }}
                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                <span v-if="link.badge" class="ml-2 bg-error-color text-white text-xs px-2 py-1 rounded-full">{{ link.badge }}</span>
              </div>
              <!-- Sub-menu -->
              <div v-if="link.sublinks && link.sublinks.length > 0" class="absolute top-full right-0 bg-white shadow-lg rounded-md mt-2 w-80 p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 grid grid-cols-2 gap-4">
                <div v-for="sublink in link.sublinks" :key="sublink.name" class="flex items-start space-x-3 p-2 rounded-md hover:bg-accent transition-colors">
                  <i v-if="sublink.icon" :class="sublink.icon" class="text-primary mt-1"></i>
                  <div class="flex-1">
                    <router-link 
                      :to="sublink.href" 
                      class="block text-sm font-medium text-text-secondary hover:text-primary cursor-pointer transition-colors duration-200"
                      @click="closeDropdown"
                    >
                      {{ sublink.name }}
                    </router-link>
                    <p v-if="sublink.description" class="text-xs text-text-light mt-1 line-clamp-2">{{ sublink.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Search Icon (visible below 'lg') -->
          <button @click="isSearchOpen = true" class="lg:hidden text-text-secondary hover:text-[#443627] cursor-pointer p-2">
            <i class="fas fa-search text-xl h-7 w-7"></i>
          </button>

          <!-- Search Bar (visible from 'lg' upwards) - now opens modal -->
          <div class="hidden lg:block">
             <button @click="isSearchOpen = true" class="flex items-center w-40 xl:w-64 pl-4 pr-3 py-2 border rounded-full text-left text-text-light bg-white hover:bg-gray-50 transition-all duration-300">
                <span class="flex-grow">Rechercher...</span>
                <i class="fas fa-search h-5 w-5"></i>
            </button>
          </div>

          <!-- Cart Icon (always visible) -->
          <button @click="$emit('toggle-cart')" class="relative text-text-secondary hover:text-[#443627] cursor-pointer p-2">
            <i class="fas fa-shopping-cart text-xl h-7 w-7"></i>
            <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <!-- Search Modal with blurred background -->
  <div v-if="isSearchOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 bg-black/20 backdrop-blur-sm">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 sm:p-6 border-b flex-shrink-0">
        <h2 class="text-xl font-semibold text-text-primary">Rechercher un produit</h2>
        <button @click="closeAndResetSearch" class="text-text-light hover:text-text-primary">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
      
      <!-- Search Form -->
      <div class="p-4 sm:p-6 border-b flex-shrink-0">
        <form @submit.prevent="goToSearchResults">
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Que cherchez-vous ?" 
                class="w-full pl-4 pr-4 py-3 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-primary"
                :disabled="isLoading"
                autofocus
              >
            </div>
            <button 
              type="submit" 
              class="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              :disabled="isLoading || !searchQuery.trim()"
            >
              <i v-if="!isLoading" class="fas fa-search mr-2"></i>
              <i v-else class="fas fa-spinner fa-spin mr-2"></i>
              <span class="font-medium">{{ isLoading ? 'Recherche...' : 'Rechercher' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
        <!-- Error Message -->
        <div v-if="searchError" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          {{ searchError }}
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading && searchQuery.trim().length >= 2" class="text-center py-8">
          <i class="fas fa-spinner fa-spin text-primary text-2xl mb-2"></i>
          <p class="text-sm text-text-secondary">Recherche en cours...</p>
        </div>

                 <!-- Search Results -->
         <div v-if="searchResults.length > 0 && !isLoading" class="space-y-4">
           <div class="flex items-center justify-between">
             <h3 class="text-lg font-semibold text-text-primary">
               Résultats ({{ searchResults.length }})
             </h3>
             <div class="flex items-center space-x-2">
               <span class="text-sm text-text-light">Recherche pour "{{ searchQuery }}"</span>
               <button 
                 @click="refreshSearch"
                 class="text-xs text-primary hover:text-primary-dark p-1 rounded"
                 title="Actualiser les résultats"
               >
                 <i class="fas fa-sync-alt"></i>
               </button>
             </div>
           </div>
          
          <div class="grid gap-4">
            <div 
              v-for="product in searchResults" 
              :key="product.id"
              class="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
              @click="goToProductDetails(product)"
            >
              <!-- Product Image -->
              <div class="w-16 h-16 mr-4 flex-shrink-0">
                <img 
                  :src="getImageUrl(product.image_cover)" 
                  :alt="product.nom"
                  class="w-full h-full object-cover rounded-md"
                  @error="handleImageError"
                >
              </div>
              
              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-text-primary text-lg mb-1">{{ product.nom }}</h4>
                
                
                <!-- Price -->
                <div class="flex items-center space-x-2">
                  <span v-if="product.prix_promotion && product.prix_promotion > 0" class="text-lg font-bold text-primary">
                    {{ formatPrice(product.prix_promotion) }} FCFA
                  </span>
                  <span v-else class="text-lg font-bold text-primary">
                    {{ formatPrice(product.prix) }} FCFA
                  </span>
                  <span v-if="product.prix_promotion && product.prix_promotion > 0" class="text-sm text-text-light line-through">
                    {{ formatPrice(product.prix) }} FCFA
                  </span>
                </div>
                
                <!-- Product Details -->
                <div class="flex items-center space-x-4 mt-2 text-xs text-text-light">
                  <span v-if="product.stock > 0" class="text-green-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    En stock <!-- ({{ product.stock }}) -->
                  </span>
                  <span v-else class="text-red-600">
                    <i class="fas fa-times-circle mr-1"></i>
                    Rupture de stock
                  </span>
                  <span v-if="product.hasTailles">
                    <i class="fas fa-ruler mr-1"></i>
                    {{ product.tailles.join(', ') }}
                  </span>
                  <span v-if="product.hasCouleurs">
                    <i class="fas fa-palette mr-1"></i>
                    {{ product.couleurs.join(', ') }}
                  </span>
                </div>
              </div>
              
              <!-- Arrow Icon -->
              <div class="text-text-light ml-4">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-if="!isLoading && searchQuery.trim().length >= 2 && searchResults.length === 0 && !searchError" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Aucun résultat trouvé</h3>
          <p class="text-text-light">Essayez avec d'autres mots-clés</p>
        </div>

        <!-- Initial State -->
        <div v-if="!isLoading && searchQuery.trim().length < 2" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Rechercher des produits</h3>
          <p class="text-text-light">Tapez au moins 2 caractères pour commencer la recherche</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { mainMenu, fetchActiveCategories } from '../../config/menu.js';
import { productService, API_BASE_URL } from '../../config/api.js';
import { useRouter } from 'vue-router';
import { getImageUrl, handleImageError, formatPrice } from '../../config/utils.js';

// Fonction utilitaire pour parser les données JSON des produits
const parseProductData = (product) => {
  try {
    // Parser les tailles si c'est une chaîne JSON
    if (typeof product.tailles === 'string') {
      product.tailles = JSON.parse(product.tailles);
    }
    
    // Parser les couleurs si c'est une chaîne JSON
    if (typeof product.couleurs === 'string') {
      product.couleurs = JSON.parse(product.couleurs);
    }
    
    // Parser les images si c'est une chaîne JSON
    if (typeof product.images === 'string') {
      product.images = JSON.parse(product.images);
    }
    
    return product;
  } catch (error) {
    console.warn('Erreur lors du parsing des données du produit:', error);
    // En cas d'erreur, retourner des valeurs par défaut
    return {
      ...product,
      tailles: Array.isArray(product.tailles) ? product.tailles : [],
      couleurs: Array.isArray(product.couleurs) ? product.couleurs : [],
      images: Array.isArray(product.images) ? product.images : []
    };
  }
};

// Fonction utilitaire pour formater l'affichage des données des produits
const formatProductDisplay = (product) => {
  const parsedProduct = parseProductData(product);
  
  return {
    ...parsedProduct,
    tailles: Array.isArray(parsedProduct.tailles) ? parsedProduct.tailles : [],
    couleurs: Array.isArray(parsedProduct.couleurs) ? parsedProduct.couleurs : [],
    images: Array.isArray(parsedProduct.images) ? parsedProduct.images : [],
    hasTailles: Array.isArray(parsedProduct.tailles) && parsedProduct.tailles.length > 0,
    hasCouleurs: Array.isArray(parsedProduct.couleurs) && parsedProduct.couleurs.length > 0
  };
};

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  },
  cartItemCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['toggle-sidebar', 'toggle-cart']);

const router = useRouter();
const isSearchOpen = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const isLoading = ref(false);
const searchError = ref('');

// ⛔️ plus de recherche automatique, donc plus de timeout

// ✅ Fonction appelée quand on clique sur le bouton de recherche
const goToSearchResults = () => {
  if (!searchQuery.value.trim()) {
    searchError.value = 'Veuillez saisir une requête de recherche.';
    searchResults.value = [];
    return;
  }
  performRealTimeSearch(searchQuery.value);
};

const closeAndResetSearch = () => {
  isSearchOpen.value = false;
  searchQuery.value = '';
  searchResults.value = [];
  searchError.value = '';
  isLoading.value = false;
};

const goToProductDetails = (product) => {
  router.push({
    name: 'DetailsProduit',
    params: { id: product.id }
  });
  closeAndResetSearch();
};

const performRealTimeSearch = async (query) => {
  if (query.trim().length < 1) {
    searchResults.value = [];
    searchError.value = 'Veuillez entrer au moins un caractère.';
    return;
  }

  isLoading.value = true;
  searchError.value = '';

  try {
    const response = await productService.searchProducts(query);

    if (response && response.data) {
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        // Parser et formater les données JSON de chaque produit
        searchResults.value = response.data.data.map(product => formatProductDisplay(product));
        searchError.value = '';
      } else {
        searchResults.value = [];
        searchError.value = 'Aucun produit trouvé pour votre recherche.';
      }
    } else {
      searchResults.value = [];
      searchError.value = 'Réponse invalide du serveur.';
    }
  } catch (error) {
    console.error('Erreur lors de la recherche en temps réel:', error);

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      searchError.value = 'Erreur de connexion. Vérifiez votre connexion internet.';
    } else if (error.response) {
      if (error.response.status === 304) {
        return;
      } else if (error.response.status === 404) {
        searchError.value = 'Service de recherche non disponible.';
      } else if (error.response.status === 500) {
        searchError.value = 'Erreur interne du serveur.';
      } else {
        searchError.value = `Erreur serveur (${error.response.status}).`;
      }
    } else if (error.request) {
      searchError.value = 'Impossible de contacter le serveur.';
    } else {
      searchError.value = 'Une erreur est survenue lors de la recherche.';
    }

    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// ✅ Rafraîchir la recherche manuellement
const refreshSearch = () => {
  if (searchQuery.value.trim().length >= 1) {
    performRealTimeSearch(searchQuery.value);
  }
};



// Injecter la classe utilitaire pour line-clamp-2
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Styles pour le bandeau défilant séquentiel */
  .scrolling-text {
    overflow: hidden;
    white-space: nowrap;
  }
  
  .text-container {
    display: inline-block;
    animation: scroll-sequential 15s linear infinite;
  }
  
  .text-item {
    display: inline-block;
    white-space: nowrap;
    margin-right: 200px;
  }
  
  @keyframes scroll-sequential {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-90%);
    }
  }
  
  /* Pause l'animation au survol */
  .scrolling-text:hover .text-container {
    animation-play-state: paused;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

const menuWithCategories = ref([...mainMenu]);

const updateMenuWithCategories = (categories) => {
  menuWithCategories.value = mainMenu.map(item => {
    if (item.name === 'Categories') {
      return {
        ...item,
        sublinks: categories
      };
    }
    return item;
  });
};

// Fonction pour fermer le menu déroulant après navigation
const closeDropdown = () => {
  // Cette fonction peut être utilisée pour fermer le menu si nécessaire
  // Pour l'instant, le menu se ferme automatiquement grâce au CSS hover
};

onMounted(async () => {
  try {
    const categories = await fetchActiveCategories();
    if (categories && categories.length > 0) {
      updateMenuWithCategories(categories);
    } else {
      console.warn('Aucune catégorie trouvée ou erreur lors du chargement');
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});
</script>
