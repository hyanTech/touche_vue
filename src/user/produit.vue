<template>
    <DefaultLayout>
      <div class="bg-bg-secondary">
        <div class="container mx-auto px-4 py-8 md:py-12">
          <h1 class="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">Nos produits</h1>
  
          <!-- État de chargement -->
          <div v-if="isLoading" class="flex justify-center items-center py-16">
            <div class="text-center">
              <svg class="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="mt-4 text-text-secondary">Chargement des produits...</p>
            </div>
          </div>
  
          <!-- Message d'erreur -->
          <div v-else-if="error" class="text-center py-16 bg-red-50 p-8 rounded-lg">
            <div class="text-error-color mb-4">
              <svg class="w-16 h-16 mx-auto text-error-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <p class="text-text-primary font-semibold text-lg mb-4">{{ error }}</p>
            <button @click="fetchProducts" class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-hover-color transition-transform transform hover:scale-105">
              Réessayer
            </button>
          </div>
  
                     <!-- Grille des produits - NOUVEAU DESIGN RESPONSIVE -->
           <div v-else-if="paginatedProducts.length > 0" class="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <!-- Boucle sur les produits de la page actuelle -->
            <div v-for="product in paginatedProducts" :key="product.id" 
                 class="product-card bg-white rounded-xl shadow-md overflow-hidden flex flex-row md:flex-col cursor-pointer" 
                 @click="viewProductDetails(product)">
              
              <!-- Conteneur de l'image (responsive) - CORRIGÉ -->
              <div class="relative w-1/3 md:w-full h-auto flex-shrink-0 md:h-64 bg-gray-100 flex items-center justify-center">
                <!-- Loader pendant le chargement de l'image -->
                <div v-if="!product.imageLoaded" class="absolute inset-0 flex items-center justify-center">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                
                <!-- Image du produit -->
                <img :src="getImageUrl(product.image_cover || product.imageUrl)" 
                     :alt="'Image de ' + product.name" 
                     class="w-full h-full object-contain cursor-pointer transition-opacity duration-300"
                     :class="{ 'opacity-0': !product.imageLoaded, 'opacity-100': product.imageLoaded }"
                     @load="onImageLoad(product)"
                     @error="onImageError(product)">
                
                <!-- Badge de promotion -->
                <div v-if="product.originalPrice && product.originalPrice > product.price" class="promotion-badge absolute top-3 left-3 bg-error-color text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                </div>
              </div>
  
              <!-- Contenu de la carte -->
              <div class="p-4 flex flex-col flex-grow">
                                 <h2 class="text-base md:text-lg font-bold text-text-primary line-clamp-2 mb-2">{{ product.name }}</h2>
                
                <!-- Prix (placé en bas) -->
                <div class="mt-auto">
                  <div class="flex items-baseline mb-4">
                    <span class="text-xl font-extrabold text-primary">{{ product.price.toLocaleString() }} FCFA</span>
                    <span v-if="product.originalPrice" class="ml-2 text-sm text-text-light line-through">{{ product.originalPrice.toLocaleString() }} FCFA</span>
                  </div>
  
                  <!-- Boutons d'action -->
                  <div class="flex items-center space-x-3">
                    <!-- Bouton Ajouter (visible sur desktop, icône sur mobile) -->
                    <button 
                      @click.stop="handleAddToCart(product)" 
                      :disabled="!product.stock || product.stock <= 0"
                      :class="[
                        'flex items-center justify-center px-3 py-2 rounded-lg transition-colors text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary add-to-cart-btn',
                        product.stock && product.stock > 0 
                          ? 'btn-available' 
                          : 'btn-disabled'
                      ]"
                    >
                                             <!-- Icône panier sur mobile, texte sur desktop -->
                       <i v-if="product.stock && product.stock > 0" class="fas fa-shopping-cart text-lg md:hidden"></i>
                       <span class="hidden md:inline">{{ product.stock && product.stock > 0 ? 'Ajouter' : 'Rupture de stock' }}</span>
                       <!-- Icône de rupture de stock sur mobile -->
                       <i v-if="!product.stock || product.stock <= 0" class="fas fa-times-circle text-lg md:hidden"></i>
                    </button>
                    <button 
                      @click.stop="viewProductDetails(product)" 
                      :disabled="!product.stock || product.stock <= 0"
                      :class="[
                        'w-full text-center px-3 py-2 rounded-lg transition-colors text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary',
                        product.stock && product.stock > 0 
                          ? 'bg-primary text-white hover:bg-hover-color' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      ]"
                    >
                      {{ product.stock && product.stock > 0 ? 'Acheter' : 'Indisponible' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div v-else class="text-center text-text-secondary mt-16">
            <p>Aucun produit à afficher.</p>
          </div>
  
          <!-- Contrôles de Pagination -->
          <div v-if="totalPages > 1" class="mt-12" id="pagination-section">
            <!-- Indicateur de page actuelle -->
            <div class="text-center mb-4 text-text-secondary text-sm">
              Page {{ currentPage }} sur {{ totalPages }} 
              
            </div>
            
            <!-- Boutons de pagination -->
            <div class="flex justify-center items-center space-x-1 sm:space-x-2">
                           <!-- Bouton Précédent -->
             <button @click="prevPage" :disabled="currentPage === 1" class="px-3 sm:px-4 py-2 font-semibold bg-white text-text-primary rounded-md shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors pagination-button">
               <span class="hidden sm:inline">Précédent</span>
               <span class="sm:hidden">‹</span>
             </button>
              
                           <!-- Première page -->
             <button v-if="showFirstPage" @click="goToPage(1)" :class="['px-3 sm:px-4 py-2 rounded-md transition-colors pagination-button', currentPage === 1 ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary hover:bg-accent']">
               1
             </button>
              
              <!-- Ellipsis après la première page -->
              <span v-if="showFirstEllipsis" class="px-2 py-2 text-text-secondary">...</span>
              
                           <!-- Pages du milieu (limitées) -->
             <button v-for="pageNumber in visiblePageNumbers" :key="pageNumber" @click="goToPage(pageNumber)" :class="['px-3 sm:px-4 py-2 rounded-md transition-colors pagination-button', currentPage === pageNumber ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary hover:bg-accent']">
               {{ pageNumber }}
             </button>
              
              <!-- Ellipsis avant la dernière page -->
              <span v-if="showLastEllipsis" class="px-2 py-2 text-text-secondary">...</span>
              
                           <!-- Dernière page -->
             <button v-if="showLastPage" @click="goToPage(totalPages)" :class="['px-3 sm:px-4 py-2 rounded-md transition-colors pagination-button', currentPage === totalPages ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary hover:bg-accent']">
               {{ totalPages }}
             </button>
              
                           <!-- Bouton Suivant -->
             <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 sm:px-4 py-2 font-semibold bg-white text-text-primary rounded-md shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors pagination-button">
               <span class="hidden sm:inline">Suivant</span>
               <span class="sm:hidden">›</span>
             </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal d'ajout au panier -->
      <AddToCartModal 
        :show="showSelectionModal"
        :product="selectedProduct"
        @close="closeSelectionModal"
        @added="onProductAdded"
      />
      
    </DefaultLayout>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AddToCartModal from '../components/AddToCartModal.vue';
import { productService } from '../config/api.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';
import { getImageUrl, handleImageError } from '../config/utils.js';
  
  const router = useRouter();
  const { addToCart } = useCart();
  const { showSuccess, showError } = useUserNotification();
  
  // --- État Réactif ---
  const products = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const isLoading = ref(true); // Start with loading true
  const error = ref(null);
  
  // --- États du modal de sélection ---
  const showSelectionModal = ref(false);
  const selectedProduct = ref(null);
  
  // --- Propriétés Calculées ---
  const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage.value));
  
  // Pagination intelligente - limite le nombre de boutons affichés
  const visiblePageNumbers = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const maxVisible = window.innerWidth < 768 ? 3 : 5; // 3 sur mobile, 5 sur desktop
    
    if (total <= maxVisible) {
      // Si peu de pages, afficher toutes
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    let start = Math.max(2, current - Math.floor(maxVisible / 2));
    let end = Math.min(total - 1, start + maxVisible - 1);
    
    // Ajuster si on est trop près de la fin
    if (end === total - 1) {
      start = Math.max(2, end - maxVisible + 1);
    }
    
    // Ajuster si on est trop près du début
    if (start === 2) {
      end = Math.min(total - 1, start + maxVisible - 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  
  // Conditions pour afficher les ellipsis et pages limites
  const showFirstPage = computed(() => {
    const firstVisible = visiblePageNumbers.value[0];
    return firstVisible > 2;
  });
  
  const showLastPage = computed(() => {
    const lastVisible = visiblePageNumbers.value[visiblePageNumbers.value.length - 1];
    return lastVisible < totalPages.value - 1;
  });
  
  const showFirstEllipsis = computed(() => {
    const firstVisible = visiblePageNumbers.value[0];
    return firstVisible > 2;
  });
  
  const showLastEllipsis = computed(() => {
    const lastVisible = visiblePageNumbers.value[visiblePageNumbers.value.length - 1];
    return lastVisible < totalPages.value - 1;
  });
  
  const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      return products.value.slice(startIndex, startIndex + itemsPerPage.value);
  });
  
  // --- Méthodes ---
  
  // Ajuste le nombre d'éléments par page selon la taille d'écran
  function adjustItemsPerPage() {
    if (window.innerWidth < 640) { // Mobile
      itemsPerPage.value = 4;
    } else if (window.innerWidth < 1024) { // Tablet
      itemsPerPage.value = 6;
    } else { // Desktop
      itemsPerPage.value = 9;
    }
    
    // Réinitialiser à la première page si nécessaire
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = 1;
    }
  }
  
     // Simule un chargement et remonte discrètement en haut
   function scrollToTopWithLoading() {
       // Remonter immédiatement en haut de page (discrètement)
       window.scrollTo({ top: 0, behavior: 'instant' });
       
       // Afficher l'état de chargement
       isLoading.value = true;
       
       // Simuler un chargement de 2 secondes
       setTimeout(() => {
           isLoading.value = false;
       }, 500);
   }
  
     function nextPage() {
       if (currentPage.value < totalPages.value) {
           currentPage.value++;
           scrollToTopWithLoading();
       }
   }
   
   function prevPage() {
       if (currentPage.value > 1) {
           currentPage.value--;
           scrollToTopWithLoading();
       }
   }
   
   function goToPage(pageNumber) {
       if (pageNumber !== currentPage.value) {
           currentPage.value = pageNumber;
           scrollToTopWithLoading();
       }
   }
  
  // Fonction pour récupérer les produits depuis l'API
  async function fetchProducts() {
      isLoading.value = true;
      error.value = null;
      
      try {
          const response = await productService.getAllActiveProducts();
          
                     if (response.data && response.data.success && Array.isArray(response.data.data)) {
               products.value = response.data.data.map(product => {
                   // Parser les champs JSON
                   let couleurs = [];
                   let tailles = [];
                   
                   try {
                       if (product.couleurs && product.couleurs !== "[]") {
                           couleurs = JSON.parse(product.couleurs);
                       }
                       if (product.tailles && product.tailles !== "[]") {
                           tailles = JSON.parse(product.tailles);
                       }
                   } catch (parseError) {
                       console.warn('Erreur lors du parsing JSON pour le produit:', product.id, parseError);
                       couleurs = [];
                       tailles = [];
                   }
                   
                   return {
                       id: product.id,
                       name: product.nom,
                       description: product.description || 'Aucune description disponible',
                       price: product.prix_promotion && product.prix_promotion > 0 ? parseFloat(product.prix_promotion) : parseFloat(product.prix),
                       originalPrice: product.prix_promotion && product.prix_promotion > 0 && product.prix !== product.prix_promotion ? parseFloat(product.prix) : null,
                       imageUrl: product.image_cover, // Stocker l'URL brute, pas traitée
                       stock: product.stock,
                       category: product.categorie,
                       tailles: tailles,
                       couleurs: couleurs,
                       imageLoaded: false, // Ajouter l'état de chargement de l'image
                       // Ajouter les champs originaux pour le panier
                       prix: product.prix,
                       prix_promotion: product.prix_promotion,
                       image_cover: product.image_cover
                   };
               });
          } else {
              throw new Error('Format de réponse invalide');
          }
      } catch (err) {
          console.error('Erreur lors de la récupération des produits:', err);
          error.value = 'Erreur lors du chargement des produits. Veuillez réessayer.';
          showError('Erreur lors du chargement des produits');
      } finally {
          isLoading.value = false;
      }
  }
  
     // Méthodes pour les actions sur les produits
   function handleAddToCart(product) {
       // Vérifier le stock avant d'ajouter au panier
       if (!product.stock || product.stock <= 0) {
           showError('Ce produit n\'est plus disponible en stock');
           return;
       }
       
       // Vérifier si le produit a des tailles ou couleurs (maintenant parsés en tableaux)
       const hasOptions = (product.tailles && Array.isArray(product.tailles) && product.tailles.length > 0) || 
                         (product.couleurs && Array.isArray(product.couleurs) && product.couleurs.length > 0);
       
       if (hasOptions) {
           // Ouvrir le modal de sélection
           openSelectionModal(product);
       } else {
           // Ajouter directement au panier
           addToCartDirectly(product);
       }
   }
   
   function openSelectionModal(product) {
       selectedProduct.value = product;
       showSelectionModal.value = true;
   }
   
   function closeSelectionModal() {
       showSelectionModal.value = false;
       selectedProduct.value = null;
   }
   
   function onProductAdded(product, quantity) {
       // Callback optionnel pour gérer l'ajout au panier
       console.log('Produit ajouté:', product, 'Quantité:', quantity);
   }
   
   // Cette fonction n'est plus utilisée dans cette page car on utilise toujours le modal
   function addToCartDirectly(product) {
       try {
           const productForCart = {
               id: product.id,
               nom: product.name, // Utiliser 'nom' pour correspondre au panier
               prix: product.price,
               prix_promotion: product.originalPrice ? product.price : null, // Seulement si il y a un prix original barré
               image_cover: product.image_cover, // Utiliser le champ original image_cover
               stock: product.stock || 999,
               description: product.description
           };
           
           addToCart(productForCart, 1);
           showSuccess(`${product.name} ajouté au panier !`);
       } catch (error) {
           showError('Erreur lors de l\'ajout au panier: ' + error.message);
       }
   }
  
     function handleBuyNow(product) {
       // Vérifier le stock avant l'achat direct
       if (!product.stock || product.stock <= 0) {
           showError('Ce produit n\'est plus disponible en stock');
           return;
       }
       
       try {
           const productForDirectPurchase = {
               id: product.id,
               nom: product.name,
               prix: product.price,
               prix_promotion: product.price,
               image: product.imageUrl, // URL brute pour l'achat direct
               stock: product.stock || 999,
               description: product.description,
               qte: 1
           };
           
           localStorage.setItem('directPurchaseData', JSON.stringify(productForDirectPurchase));
           router.push('/info?directPurchase=true');
       } catch (error) {
           showError('Erreur lors de l\'achat direct: ' + error.message);
       }
   }
  
  // Fonction pour voir les détails du produit
  function viewProductDetails(product) {
      localStorage.setItem('productDetails', JSON.stringify({
          id: product.id,
          nom: product.name,
          prix: product.price,
          prix_promotion: product.price,
          image: product.imageUrl,
          stock: product.stock || 999,
          description: product.description,
          category: product.category
      }));
      
      router.push(`/details_produit/${product.id}`);
  }
  
  // --- Hook de Cycle de Vie ---
  onMounted(() => {
      fetchProducts();
      adjustItemsPerPage(); // Ajuster le nombre d'éléments par page au chargement
      window.addEventListener('resize', adjustItemsPerPage); // Redimensionner lors du redimensionnement de la fenêtre
  });

  onUnmounted(() => {
      window.removeEventListener('resize', adjustItemsPerPage);
  });
  
  // Fonction pour gérer le chargement de l'image
  function onImageLoad(product) {
      product.imageLoaded = true;
  }
  
  // Fonction pour gérer les erreurs de chargement d'image
  function onImageError(product) {
      product.imageLoaded = true; // Masquer le loader
      console.warn('Erreur de chargement de l\'image pour le produit:', product.id);
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
  
  .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
  
  /* Effet de survol amélioré pour les cartes de produits */
  .product-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  
  .product-card img {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .product-card:hover img {
      transform: scale(1.05);
  }
  
  
     /* Styles pour les badges de promotion */
   .promotion-badge {
       animation: pulse 2s infinite;
   }
   
   @keyframes pulse {
       0%, 100% {
           transform: scale(1);
           opacity: 1;
       }
       50% {
           transform: scale(1.05);
           opacity: 0.9;
       }
   }
   
   /* Styles pour les boutons d'ajout au panier */
   .add-to-cart-btn {
       transition: all 0.3s ease;
   }
   
   .btn-available {
       background-color: white;
       border: 2px solid var(--primary-color);
       color: var(--primary-color);
   }
   
   .btn-available:hover {
       background-color: var(--primary-color);
       color: white;
   }
   
   .btn-disabled {
       background-color: #d1d5db;
       border: 2px solid #d1d5db;
       color: #6b7280;
       cursor: not-allowed;
   }
   
   /* Styles pour la pagination mobile */
   @media (max-width: 640px) {
       .pagination-container {
           flex-wrap: wrap;
           gap: 0.5rem;
       }
       
       .pagination-container button {
           min-width: 2.5rem;
           height: 2.5rem;
           font-size: 0.875rem;
       }
   }
   
   /* Animation pour les ellipsis */
   .ellipsis {
       animation: fadeInOut 2s ease-in-out infinite;
   }
   
   @keyframes fadeInOut {
       0%, 100% { opacity: 0.6; }
       50% { opacity: 1; }
   }
   
   /* Styles pour le loader d'image */
   .image-loader {
       background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
       background-size: 200% 100%;
       animation: shimmer 1.5s infinite;
   }
   
   @keyframes shimmer {
       0% { background-position: -200% 0; }
       100% { background-position: 200% 0; }
   }
   
   /* Transition douce pour l'apparition des images */
   .image-transition {
       transition: opacity 0.3s ease-in-out;
   }
   
   /* Style pour l'image par défaut en cas d'erreur */
   .default-image {
       background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
   }
   
   /* Transition douce pour les boutons de pagination */
   .pagination-button {
       transition: all 0.3s ease;
   }
   
   .pagination-button:hover {
       transform: translateY(-2px);
       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   }
  </style>