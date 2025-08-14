<template>
  <DefaultLayout>
    <div class="bg-white">
      <!-- Loading State -->
      <div v-if="loading" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <p class="mt-4 text-gray-600">Chargement du produit...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center py-12">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <i class="fas fa-exclamation-circle text-red-500 text-2xl mb-4"></i>
            <h3 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
            <p class="text-sm text-red-700 mb-4">{{ error }}</p>
            <button @click="loadProduct" class="text-sm text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-md">
              <i class="fas fa-redo mr-1"></i>Réessayer
            </button>
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          <!-- Galerie d'Images -->
          <div class="flex flex-col gap-4">
            <div class="aspect-square w-full overflow-hidden rounded-lg shadow-lg bg-gray-100 relative">
              <transition name="fade">
                <img 
                  :src="getImageUrl(product.activeImage)" 
                  :key="product.activeImage"
                  alt="Image principale du produit" 
                  class="absolute top-0 left-0 w-full h-full object-cover"
                  @error="handleImageError"
                >
              </transition>
            </div>
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-4">
                             <!-- Image principale (cover) -->
               <div
                 @click="product.activeImage = product.image_cover"
                 class="cursor-pointer rounded-md overflow-hidden transition-all duration-200 aspect-square bg-gray-100"
                 :class="{'ring-2 ring-offset-2 ring-primary': product.activeImage === product.image_cover, 'hover:opacity-75': product.activeImage !== product.image_cover}"
               >
                 <img 
                   :src="getImageUrl(product.image_cover)" 
                   alt="Image principale du produit" 
                   class="w-full h-full object-cover"
                   @error="handleImageError"
                 >
               </div>
               <!-- Images supplémentaires -->
               <div
                 v-for="(image, index) in product.images"
                 :key="index"
                 @click="product.activeImage = image.filename"
                 class="cursor-pointer rounded-md overflow-hidden transition-all duration-200 aspect-square bg-gray-100"
                 :class="{'ring-2 ring-offset-2 ring-primary': product.activeImage === image.filename, 'hover:opacity-75': product.activeImage !== image.filename}"
               >
                <img 
                  :src="getImageUrl(image.filename)" 
                  :alt="image.alt || 'Miniature du produit'" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                >
              </div>
            </div>
          </div>

          <!-- Détails du Produit -->
          <div class="flex flex-col gap-6">
            <div>
              <div class="flex justify-between items-start gap-4">
                <h1 class="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">{{ product.nom }}</h1>
                <button @click="toggleFavorite" class="p-2 text-gray-400 hover:text-primary transition-colors duration-200 flex-shrink-0" aria-label="Ajouter aux favoris">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" :class="{'text-primary': isFavorited}" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    <path v-if="isFavorited" stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div class="flex items-baseline gap-3 mt-2">
                <p class="text-2xl font-semibold text-primary">
                  {{ formatPrice(product.prix_promotion && product.prix_promotion > 0 ? product.prix_promotion : product.prix) }} FCFA
                </p>
                <p v-if="product.prix_promotion && product.prix_promotion > 0" class="text-xl font-medium text-text-light line-through">{{ formatPrice(product.prix) }} FCFA</p>
              </div>
              <!-- Statut du stock -->
              <div class="mt-2">
                <span :class="getStockStatusClass(product.stock)"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getStockStatusText(product.stock) }}
                </span>
                <!-- Quantité en stock -->
                <div class="mt-2 text-sm text-text-secondary">
                  <!-- <i class="fas fa-boxes mr-1"></i> -->
                  <span v-if="product.stock > 0">
                    <!-- {{ product.stock }} {{ product.stock === 1 ? 'article' : 'articles' }} en stock -->
                  </span>
                  <span v-else class="text-error-color">
                    Rupture de stock
                  </span>
                </div>
              </div>
            </div>
            
            <!-- <p class="text-text-secondary leading-relaxed">{{ product.description }}</p> -->
            
            <!-- Sélections -->
            <div v-if="product.couleurs && product.couleurs.length > 0">
              <h3 class="text-md font-medium text-text-primary mb-2">Couleur : <span class="font-bold">{{ product.selectedColor }}</span></h3>
              <div class="flex items-center gap-3">
                <button v-for="color in product.couleurs" :key="color" @click="product.selectedColor = color" class="w-8 h-8 rounded-full transition-transform duration-200 transform hover:scale-110 focus:outline-none ring-offset-2 ring-2" :class="[getColorClass(color), {'ring-primary': product.selectedColor === color, 'ring-transparent': product.selectedColor !== color}]">
                  <span class="sr-only">{{ color }}</span>
                </button>
              </div>
            </div>
            <div v-if="product.tailles && product.tailles.length > 0">
              <h3 class="text-md font-medium text-text-primary mb-2">Taille : <span class="font-bold">{{ product.selectedSize }}</span></h3>
              <div class="flex flex-wrap gap-3">
                                 <button v-for="size in product.tailles" :key="size" @click="product.selectedSize = size" class="px-4 py-2 border rounded-md font-semibold transition-colors duration-200" :class="{'bg-primary border-primary text-white shadow-sm': product.selectedSize === size, 'bg-white border-gray-300 text-text-primary hover:bg-primary hover:text-white hover:border-primary': product.selectedSize !== size}">
                   {{ size }}
                 </button>
              </div>
            </div>
            
            <!-- Actions d'achat -->
            <div class="flex items-center gap-4 mt-4">
              <!-- Sélecteur de quantité -->
              <div class="flex items-center border border-gray-300 rounded-md">
                                 <button @click="decrementQuantity" 
                         :disabled="quantity <= 1"
                         class="px-3 py-2 text-text-secondary hover:bg-primary hover:text-white rounded-l-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
                 <span class="px-4 py-2 font-semibold text-text-primary bg-white">{{ quantity }}</span>
                 <button @click="incrementQuantity" 
                         :disabled="quantity >= product.stock"
                         class="px-3 py-2 text-text-secondary hover:bg-primary hover:text-white rounded-r-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
              </div>
                             <!-- Bouton d'achat direct -->
               <button @click="goToInfoPage" 
                       :disabled="product.stock === 0 || !canProceedToPurchase"
                       class="flex-grow bg-white text-[#000] font-bold py-2.5 px-6 rounded-lg shadow-sm border border-primary hover:bg-primary hover:text-white hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                 Acheter
               </button>
            </div>



            <!-- Section de personnalisation du panier -->
            <div v-if="product.stock > 0 && (product.couleurs?.length > 0 || product.tailles?.length > 0)" class="mt-6 p-4 bg-accent rounded-lg border border-accent">
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-magic text-primary"></i>
                <h3 class="text-lg font-semibold text-[#2C2C2C]">Personnaliser votre panier</h3>
              </div>
              <p class="text-sm text-[#2C2C2C] mb-4">
                Ajoutez ce produit au panier avec vos préférences de couleur et taille !
              </p>
              


              <!-- Formulaire d'ajout de variante -->
              <div class="bg-white rounded-lg p-4 border border-accent">
                <h4 class="text-sm font-medium text-text-primary mb-3">Ajouter au panier</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <!-- Sélection couleur -->
                  <div v-if="product.couleurs && product.couleurs.length > 0">
                    <label class="block text-xs text-text-secondary mb-1">Couleur</label>
                    <select v-model="newVariant.color" class="w-full text-sm border border-accent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent hover:border-primary transition-colors">
                      <option value="">Sélectionner</option>
                      <option v-for="color in product.couleurs" :key="color" :value="color">{{ color }}</option>
                    </select>
                  </div>
                  <!-- Sélection taille -->
                  <div v-if="product.tailles && product.tailles.length > 0">
                    <label class="block text-xs text-text-secondary mb-1">Taille</label>
                    <select v-model="newVariant.size" class="w-full text-sm border border-accent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent hover:border-primary transition-colors">
                      <option value="">Sélectionner</option>
                      <option v-for="size in product.tailles" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </div>
                  <!-- Quantité -->
                  <div>
                    <label class="block text-xs text-text-secondary mb-1">Quantité</label>
                                         <div class="flex items-center border border-accent rounded-md">
                       <button @click="decrementNewVariantQuantity" :disabled="newVariant.quantity <= 1" class="px-2 py-1 text-text-secondary hover:bg-primary hover:text-white disabled:opacity-50">-</button>
                       <span class="px-2 py-1 text-sm font-medium">{{ newVariant.quantity }}</span>
                       <button @click="incrementNewVariantQuantity" :disabled="newVariant.quantity >= product.stock" class="px-2 py-1 text-text-secondary hover:bg-primary hover:text-white disabled:opacity-50">+</button>
                     </div>
                  </div>
                </div>
                                 <button @click="addCustomVariant" :disabled="!canAddCustomVariant" class="mt-3 w-full bg-primary text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-hover-color hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                   <i class="fas fa-plus mr-1"></i>Ajouter au panier
                 </button>
              </div>


            </div>
            
            <!-- Section d'ajout au panier simple (quand pas de variantes) -->
            <div v-else-if="product.stock > 0" class="mt-6 p-4 bg-accent rounded-lg border border-accent">
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-shopping-cart text-primary"></i>
                <h3 class="text-lg font-semibold text-[#2C2C2C]">Ajouter au panier</h3>
              </div>
              <p class="text-sm text-[#2C2C2C] mb-4">
                Ce produit est disponible en stock. Ajoutez-le directement à votre panier !
              </p>
              
              <!-- Formulaire d'ajout simple -->
              <div class="bg-white rounded-lg p-4 border border-accent">
                <h4 class="text-sm font-medium text-text-primary mb-3">Quantité</h4>
                <div class="flex items-center justify-center gap-4">
                  <div class="flex items-center border border-accent rounded-md">
                    <button @click="decrementNewVariantQuantity" :disabled="newVariant.quantity <= 1" class="px-3 py-2 text-text-secondary hover:bg-primary hover:text-white disabled:opacity-50">-</button>
                    <span class="px-4 py-2 text-sm font-medium">{{ newVariant.quantity }}</span>
                    <button @click="incrementNewVariantQuantity" :disabled="newVariant.quantity >= product.stock" class="px-3 py-2 text-text-secondary hover:bg-primary hover:text-white disabled:opacity-50">+</button>
                  </div>
                  <button @click="addSimpleToCart" class="bg-primary text-white text-sm font-medium py-2 px-6 rounded-md hover:bg-hover-color transition-colors">
                    <i class="fas fa-plus mr-1"></i>Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Message de rupture de stock -->
            <div v-else class="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-exclamation-triangle text-error-color"></i>
                <h3 class="text-lg font-semibold text-error-color">Produit indisponible</h3>
              </div>
              <p class="text-sm text-red-700 mb-4">
                Ce produit est actuellement en rupture de stock. Veuillez revenir plus tard.
              </p>
            </div>
            
            <div class="pt-6 border-t border-accent mt-2">
               <h3 class="text-lg font-semibold text-text-primary mb-2">Description complète</h3>
               <p class="text-text-secondary leading-relaxed">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Préchargement caché des images -->
      <div v-if="product && product.images && product.images.length > 0" class="hidden">
        <img v-for="image in product.images" :key="'preload-' + image.filename" :src="getImageUrl(image.filename)" />
      </div>

      <!-- Section "Vous aimerez aussi" -->
      <div v-if="otherProducts.length > 0" class="bg-bg-secondary">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary text-center">Vous aimerez aussi</h2>
          <div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for="otherProduct in otherProducts" :key="otherProduct.id" class="group relative">
              <div class="aspect-square w-full overflow-hidden rounded-md bg-gray-200 transition-opacity group-hover:opacity-75">
                <img :src="getImageUrl(otherProduct.image_cover)" :alt="otherProduct.nom" class="h-full w-full object-cover object-center" @error="handleImageError">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-text-secondary">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      {{ otherProduct.nom }}
                    </a>
                  </h3>
                </div>
                <p class="text-sm font-medium text-text-primary">
                  {{ formatPrice(otherProduct.prix_promotion && otherProduct.prix_promotion > 0 ? otherProduct.prix_promotion : otherProduct.prix) }} FCFA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { productService } from '../config/api.js';
import { getImageUrl, handleImageError, formatPrice, getStockStatusText, getStockStatusClass } from '../config/utils.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';

const route = useRoute();
const router = useRouter();

// Cart et Notification
const { addToCart } = useCart();
const { showSuccess, showError } = useUserNotification();

// États réactifs
const product = ref(null);
const loading = ref(false);
const error = ref('');
const otherProducts = ref([]);
const quantity = ref(1);
const isFavorited = ref(false);

// États pour la personnalisation du panier
const newVariant = reactive({
  color: '',
  size: '',
  quantity: 1
});

// Computed properties
const canAddCustomVariant = computed(() => {
  if (!product.value) return false;
  
  // Vérifier d'abord si le stock est disponible
  if (product.value.stock <= 0) return false;
  
  // Si le produit a des couleurs, il faut en sélectionner une
  const hasColor = product.value.couleurs && Array.isArray(product.value.couleurs) && product.value.couleurs.length > 0 ? newVariant.color : true;
  // Si le produit a des tailles, il faut en sélectionner une
  const hasSize = product.value.tailles && Array.isArray(product.value.tailles) && product.value.tailles.length > 0 ? newVariant.size : true;
  
  return hasColor && hasSize && newVariant.quantity > 0 && newVariant.quantity <= product.value.stock;
});

const canProceedToPurchase = computed(() => {
  if (!product.value) return false;
  
  // Vérifier d'abord si le stock est disponible
  if (product.value.stock <= 0) return false;
  
  // Vérifier si les sélections requises sont faites
  const hasColor = product.value.couleurs && Array.isArray(product.value.couleurs) && product.value.couleurs.length > 0 ? 
    (newVariant.color || product.value.selectedColor) : true;
  const hasSize = product.value.tailles && Array.isArray(product.value.tailles) && product.value.tailles.length > 0 ? 
    (newVariant.size || product.value.selectedSize) : true;
  
  return hasColor && hasSize;
});

// Fonctions
const loadProduct = async () => {
  loading.value = true;
  error.value = '';

  try {
    const productId = route.params.id;
    if (!productId) {
      throw new Error('ID du produit manquant');
    }

    const response = await productService.getProduct(productId);
    
    if (response.data && response.data.success && response.data.data) {
      const productData = response.data.data;
      
      // Parser les champs JSON
      let couleurs = [];
      let tailles = [];
      let images = [];
      
      try {
        if (productData.couleurs && productData.couleurs !== "[]") {
          couleurs = JSON.parse(productData.couleurs);
        }
        if (productData.tailles && productData.tailles !== "[]") {
          tailles = JSON.parse(productData.tailles);
        }
        if (productData.images && productData.images !== "[]") {
          images = JSON.parse(productData.images);
        }
      } catch (parseError) {
        console.warn('Erreur lors du parsing JSON:', parseError);
        // En cas d'erreur de parsing, on utilise des tableaux vides
        couleurs = [];
        tailles = [];
        images = [];
      }
      
      // Préparer les données du produit
      product.value = {
        ...productData,
        couleurs: couleurs,
        tailles: tailles,
        images: images,
        activeImage: productData.image_cover,
        selectedColor: couleurs.length > 0 ? couleurs[0] : null,
        selectedSize: tailles.length > 0 ? tailles[0] : null
      };

      // Charger les produits similaires (même catégorie)
      if (productData.categoryId) {
        await loadSimilarProducts(productData.categoryId, productId);
      }
    } else {
      throw new Error('Format de réponse invalide');
    }
  } catch (err) {
    console.error('Erreur lors du chargement du produit:', err);
    error.value = 'Erreur lors du chargement du produit. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};

const loadSimilarProducts = async (categoryId, excludeProductId) => {
  try {
    const response = await productService.getActiveProducts();
    if (response.data && response.data.success && response.data.data) {
      // Filtrer les produits de la même catégorie et exclure le produit actuel
      otherProducts.value = response.data.data
        .filter(p => p.categoryId === categoryId && p.id !== parseInt(excludeProductId))
        .slice(0, 4); // Limiter à 4 produits
    }
  } catch (err) {
    console.error('Erreur lors du chargement des produits similaires:', err);
  }
};

const getColorClass = (color) => {
  const colorMap = {
    'Noir': 'bg-gray-800',
    'Blanc': 'bg-white border',
    'Bleu': 'bg-blue-500',
    'Rouge': 'bg-red-500',
    'Vert': 'bg-green-500',
    'Jaune': 'bg-yellow-500',
    'Rose': 'bg-pink-500',
    'Violet': 'bg-purple-500',
    'Orange': 'bg-orange-500',
    'Gris': 'bg-gray-500'
  };
  return colorMap[color] || 'bg-gray-400';
};

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
};

const incrementQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Fonctions pour la personnalisation du panier
const incrementNewVariantQuantity = () => {
  if (newVariant.quantity < product.value.stock) {
    newVariant.quantity++;
  }
};

const decrementNewVariantQuantity = () => {
  if (newVariant.quantity > 1) {
    newVariant.quantity--;
  }
};

const addCustomVariant = () => {
  if (!canAddCustomVariant.value) return;
  
  // Vérifier le stock une dernière fois
  if (!product.value || product.value.stock <= 0) {
    showError('Ce produit n\'est plus disponible en stock');
    return;
  }

  try {
    // Créer le produit avec les variantes sélectionnées
    const productWithVariant = {
      ...product.value,
      selectedColor: (product.value.couleurs && product.value.couleurs.length > 0) ? newVariant.color : null,
      selectedSize: (product.value.tailles && product.value.tailles.length > 0) ? newVariant.size : null
    };
    
    // Ajouter au panier
    addToCart(productWithVariant, newVariant.quantity);
    
    // Réinitialiser le formulaire
    newVariant.color = '';
    newVariant.size = '';
    newVariant.quantity = 1;
    
    showSuccess('Produit ajouté au panier !');
  } catch (error) {
    showError(error.message);
  }
};

const addSimpleToCart = () => {
  if (!product.value) return;
  
  if (product.value.stock <= 0) {
    showError('Ce produit n\'est plus disponible en stock');
    return;
  }

  try {
    // Utiliser la même structure que le panier attend
    const productData = {
      ...product.value,
      selectedColor: null, // Pas de couleur sélectionnée pour un produit simple
      selectedSize: null // Pas de taille sélectionnée pour un produit simple
    };

    addToCart(productData, newVariant.quantity);
    showSuccess(`${productData.nom} ajouté au panier !`);
  } catch (error) {
    showError(error.message);
  }
};


const handleAddToCart = () => {
  if (!product.value) return;
  
  try {
    addToCart(product.value, quantity.value);
    showSuccess(`${product.value.nom} ajouté au panier !`);
  } catch (error) {
    showError(error.message);
  }
};

const goToInfoPage = () => {
  // Vérifier le stock avant de procéder à l'achat
  if (!product.value || product.value.stock <= 0) {
    showError('Ce produit n\'est plus disponible en stock');
    return;
  }
  
  // Utiliser les valeurs de la section de personnalisation si elles sont définies
  const selectedColor = (product.value.couleurs && product.value.couleurs.length > 0) ? (newVariant.color || product.value.selectedColor) : null;
  const selectedSize = (product.value.tailles && product.value.tailles.length > 0) ? (newVariant.size || product.value.selectedSize) : null;
  // Utiliser toujours la quantité du sélecteur principal pour le bouton "Acheter"
  const selectedQuantity = quantity.value;
  
  // Préparer les données du produit pour l'achat direct
  const productData = {
    ...product.value,
    selectedColor: selectedColor,
    selectedSize: selectedSize
  };
  
  
  // Stocker temporairement les données dans localStorage
  localStorage.setItem('directPurchaseData', JSON.stringify(productData));
  
  // Naviguer vers la page info avec un paramètre simple
  router.push({
    path: '/info',
    query: {
      directPurchase: 'true'
    }
  });
};

// Initialisation
onMounted(() => {
  loadProduct();
});
</script>

<style>
body {
  background-color: #f9fafb; /* gray-50 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
