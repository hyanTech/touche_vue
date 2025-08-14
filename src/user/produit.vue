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
                                 <img :src="getImageUrl(product.imageUrl)" 
                      :alt="'Image de ' + product.name" 
                      class="w-full h-full object-contain" 
                      @error="handleImageError">
                
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
                                         <button 
                       @click.stop="handleAddToCart(product)" 
                       :disabled="!product.stock || product.stock <= 0"
                       :class="[
                         'w-full text-center px-3 py-2 rounded-lg transition-colors text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary add-to-cart-btn',
                         product.stock && product.stock > 0 
                           ? 'btn-available' 
                           : 'btn-disabled'
                       ]"
                     >
                      {{ product.stock && product.stock > 0 ? 'Ajouter' : 'Rupture de stock' }}
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
          <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 space-x-1 sm:space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 sm:px-4 py-2 font-semibold bg-white text-text-primary rounded-md shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Précédent
            </button>
            <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="['px-3 sm:px-4 py-2 rounded-md transition-colors', currentPage === pageNumber ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary hover:bg-accent']">
              {{ pageNumber }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 sm:px-4 py-2 font-semibold bg-white text-text-primary rounded-md shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Suivant
            </button>
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
  import { ref, computed, onMounted } from 'vue';
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
  const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      return products.value.slice(startIndex, startIndex + itemsPerPage.value);
  });
  
  // --- Méthodes ---
  
  // Fait défiler la fenêtre vers le haut de la page
  function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function nextPage() {
      if (currentPage.value < totalPages.value) {
          currentPage.value++;
          scrollToTop();
      }
  }
  
  function prevPage() {
      if (currentPage.value > 1) {
          currentPage.value--;
          scrollToTop();
      }
  }
  
  function goToPage(pageNumber) {
      currentPage.value = pageNumber;
      scrollToTop();
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
                       couleurs: couleurs
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
               image_cover: product.imageUrl, // URL brute pour le panier
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
  });
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
  </style>