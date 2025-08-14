<template>
  <DefaultLayout>
    <!-- Section Héros -->
    <section
      v-if="!pubLoading && pubData"
      class="bg-primary rounded-lg shadow-lg text-white p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{{ pubData.titre_pub1 || 'Collection Été 2025' }}</h1>
        <p class="text-lg text-white/80 mb-6">{{ pubData.sous_titre1 || 'Découvrez nos nouveautés et profitez de -30% sur une sélection d\'articles.' }}</p>
        <a :href="pubData.url1 || '#'"
          class="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer">{{ pubData.btn1 || 'Découvrir' }}</a>
      </div>
      <div class="md:w-1/2">
        <img 
  :src="pubData?.img1" 
  :alt="pubData?.titre_pub1 || 'Image héro'" 
  class="w-full h-full object-contain "
  @error="handleImageError"
/>

      </div>
    </section>

    <!-- Section Héros par défaut si pas de pub -->
    <section
      v-else-if="!pubLoading"
      class="bg-primary rounded-lg shadow-lg text-white p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">Collection Été 2025</h1>
        <p class="text-lg text-white/80 mb-6">Découvrez nos nouveautés et profitez de -30% sur une sélection
          d'articles.</p>
        <a href="#"
          class="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer">Découvrir</a>
      </div>
      <div class="md:w-1/2"><img src="https://placehold.co/600x400/FFFFFF/FAA4BD"
          alt="Bannière promotionnelle" class="rounded-lg shadow-2xl w-full"></div>
    </section>

    <!-- Loading pour la section héros -->
    <section v-else class="bg-primary rounded-lg shadow-lg text-white p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <div class="animate-pulse">
          <div class="h-12 bg-white/20 rounded mb-4"></div>
          <div class="h-6 bg-white/20 rounded mb-6"></div>
          <div class="h-10 bg-white/20 rounded w-32"></div>
        </div>
      </div>
      <div class="md:w-1/2">
        <div class="animate-pulse bg-white/20 rounded-lg h-64"></div>
      </div>
    </section>

    <!-- Section Catégories -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-text-primary mb-6 text-center">Nos Catégories</h2>
      <CategoryManager type="home" v-slot="{ categories, loading, error }">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-2 text-text-secondary">Chargement des catégories...</p>
        </div>
        <div v-else-if="error" class="text-center py-8">
          <p class="text-error-color">{{ error }}</p>
        </div>
        <div v-else>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
            <div v-for="category in categories" :key="category.id" class="text-center group">
              <a :href="category.href"
                class="w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-primary hover:text-white text-primary transition-all duration-300 ease-in-out cursor-pointer">
                <i :class="category.icon" class="text-3xl sm:text-4xl transition-colors group-hover:text-white"></i>
              </a>
              <p class="mt-3 text-sm font-semibold text-text-secondary truncate">{{ category.name }}</p>
            </div>
          </div>
          
          <!-- Bouton "Tout voir" qui apparaît si 6 catégories ou plus -->
          <div v-if="categories.length >= 6" class="text-center mt-8">
            <a href="/categories" 
               class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-hover-color transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <span>Tout voir</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </CategoryManager>
    </section>

    <!-- Grille des produits actifs -->
    <section class="mb-12">
      <!-- Séparateur de section stylisé -->
      <div class="relative my-12">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-border-color"></div>
        </div>
        <div class="relative flex justify-center">
          <h2 class="bg-secondary px-6 text-3xl font-bold text-text-primary">Nouveaux Produits</h2>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="productsLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-4 text-text-secondary">Chargement des produits...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="productsError" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <i class="fas fa-exclamation-circle text-error-color text-2xl mb-4"></i>
          <h3 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
          <p class="text-sm text-red-700 mb-4">{{ productsError }}</p>
          <button @click="loadProducts" class="text-sm text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-md">
            <i class="fas fa-redo mr-1"></i>Réessayer
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="activeProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <div v-for="product in activeProducts" :key="product.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col">
          <div class="relative" @click="showProductDetails(product)">
            <!-- Container pour l'image avec loader -->
            <div class="relative w-full h-48 sm:h-56 bg-gray-100">
              <!-- Loader pendant le chargement -->
              <div v-if="!product.imageLoaded" class="absolute inset-0 flex items-center justify-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              
              <!-- Image -->
              <img 
                :src="getImageUrl(product.image_cover)" 
                :alt="product.nom"
                class="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
                :class="{ 'opacity-0': !product.imageLoaded, 'opacity-100': product.imageLoaded }"
                @load="product.imageLoaded = true"
                @error="handleImageError"
              >
            </div>
            
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Bouton mobile avec icône -->
              <button @click.stop="handleAddToCart(product)"
                :disabled="product.stock === 0"
                class="sm:hidden absolute top-3 left-3 text-white bg-primary hover:bg-hover-color p-3 rounded-full opacity-100 transform scale-90 hover:scale-100 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-black/70 backdrop-blur-sm">
                <i v-if="product.stock === 0" class="fas fa-times text-base"></i>
                <i v-else class="fas fa-shopping-cart text-base"></i>
              </button>
              
              <!-- Bouton desktop avec texte -->
              <button @click.stop="handleAddToCart(product)"
                :disabled="product.stock === 0"
                class="hidden sm:block text-white bg-primary py-2 px-4 text-sm sm:px-6 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-black/70 backdrop-blur-sm">
                {{ product.stock === 0 ? 'Rupture' : 'Ajouter au panier' }}
              </button>
            </div>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <div class="flex-grow">
              <h3 @click="showProductDetails(product)"
                class="font-semibold text-md text-text-primary truncate cursor-pointer hover:text-primary transition-colors">
                {{ product.nom }}</h3>
              <!-- Statut du stock -->
              <div class="mt-2">
                <span :class="getStockStatusClass(product.stock)"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getStockStatusText(product.stock) }}
                </span>
              </div>
            </div>
            <div class="mt-auto pt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div class="flex items-baseline space-x-2">
                <!-- Prix barré si promotion -->
                <p v-if="product.prix_promotion && product.prix_promotion > 0 && product.prix_promotion !== product.prix" class="text-text-light line-through text-md">{{ formatPrice(product.prix) }} FCFA</p>
                <p class="text-xl font-bold text-primary">
                  {{ formatPrice(product.prix_promotion && product.prix_promotion > 0 ? product.prix_promotion : product.prix) }} FCFA
                </p>
              </div>
              <button
                @click="showProductDetails(product)"
                :disabled="product.stock === 0"
                class="bg-gray-800 text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-primary transition-colors cursor-pointer mt-2 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ product.stock === 0 ? 'Rupture' : 'Acheter' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton "Tout voir" qui apparaît si 10 produits ou plus -->
      <div v-if="activeProducts.length >= 10" class="text-center mt-8">
        <a href="/produits" 
           class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-hover-color transition-all duration-300 transform hover:scale-105 cursor-pointer">
          <span>Tout voir</span>
          <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>

      <!-- Empty State -->
      <div v-else-if="activeProducts.length === 0" class="text-center py-12">
        <div class="bg-bg-secondary rounded-lg p-8 max-w-md mx-auto">
          <i class="fas fa-box-open text-text-light text-4xl mb-4"></i>
          <h3 class="text-lg font-medium text-text-primary mb-2">Aucun produit disponible</h3>
          <p class="text-sm text-text-secondary">Aucun produit actif n'est disponible pour le moment.</p>
        </div>
      </div>
    </section>

    <!-- Bannière promotionnelle intermédiaire -->
    <section v-if="!pubLoading && pubData" class="mb-12">
      <div class="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                 <img :src="pubData.img2" 
              :alt="pubData.titre_pub2 || 'Bannière de promotion'"
              class="absolute inset-0 w-full h-full object-cover opacity-30"
              @error="handleImageError">
        <div class="relative p-12 text-center text-white">
          <h3 class="text-sm font-bold uppercase tracking-widest text-primary">Offre Limitée</h3>
          <h2 class="text-4xl font-extrabold mt-2 mb-4">{{ pubData.titre_pub2 || 'Jusqu\'à -50% sur les fins de série' }}</h2>
          <p class="max-w-2xl mx-auto text-gray-300 mb-6">{{ pubData.sous_titre2 || 'Ne manquez pas nos meilleures offres sur une sélection d\'articles. C\'est le moment de se faire plaisir !' }}</p>
          <a :href="pubData.url2 || '#'"
            class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-hover-color transition duration-300 transform hover:scale-105 cursor-pointer">{{ pubData.btn2 || 'Voir les promotions' }}</a>
        </div>
      </div>
    </section>

    <!-- Bannière par défaut si pas de pub -->
    <section v-else-if="!pubLoading" class="mb-12">
      <div class="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img src="https://placehold.co/1200x400/1F2937/FFFFFF?text=Promo" alt="Bannière de promotion"
          class="absolute inset-0 w-full h-full object-cover opacity-30">
        <div class="relative p-12 text-center text-white">
          <h3 class="text-sm font-bold uppercase tracking-widest text-primary">Offre Limitée</h3>
          <h2 class="text-4xl font-extrabold mt-2 mb-4">Jusqu'à -50% sur les fins de série</h2>
          <p class="max-w-2xl mx-auto text-gray-300 mb-6">Ne manquez pas nos meilleures offres sur une sélection
            d'articles. C'est le moment de se faire plaisir !</p>
          <a href="#"
            class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-hover-color transition duration-300 transform hover:scale-105 cursor-pointer">Voir
            les promotions</a>
        </div>
      </div>
    </section>

    <!-- Loading pour la bannière -->
    <section v-else class="mb-12">
      <div class="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="absolute inset-0 w-full h-full bg-gray-700 opacity-30"></div>
        <div class="relative p-12 text-center text-white">
          <div class="animate-pulse">
            <div class="h-4 bg-white/20 rounded w-32 mx-auto mb-2"></div>
            <div class="h-10 bg-white/20 rounded w-96 mx-auto mb-4"></div>
            <div class="h-6 bg-white/20 rounded w-80 mx-auto mb-6"></div>
            <div class="h-12 bg-white/20 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    </section>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import CategoryManager from '../components/CategoryManager.vue';
import AddToCartModal from '../components/AddToCartModal.vue';
import { productService, headerService } from '../config/api.js';
import { getImageUrl, handleImageError, formatPrice, getStockStatusText, getStockStatusClass } from '../config/utils.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';

// --- Router ---
const router = useRouter();

// --- Cart et Notification ---
const { addToCart } = useCart();
const { showSuccess, showError } = useUserNotification();

// --- États réactifs ---
const activeProducts = ref([]);
const productsLoading = ref(false);
const productsError = ref('');

// --- États des publicités ---
const pubData = ref(null);
const pubLoading = ref(true);
const pubError = ref(null);

// --- États du modal de sélection ---
const showSelectionModal = ref(false);
const selectedProduct = ref(null);

// --- Fonctions ---
const showProductDetails = (product) => {
  router.push({ name: 'DetailsProduit', params: { id: product.id } });
};

const handleAddToCart = (product) => {
  // Vérifier si le produit a des tailles ou couleurs (maintenant parsés en tableaux)
  const hasOptions = (product.tailles && Array.isArray(product.tailles) && product.tailles.length > 0) || 
                    (product.couleurs && Array.isArray(product.couleurs) && product.couleurs.length > 0);
  
  if (hasOptions) {
    // Ouvrir le modal de sélection
    openSelectionModal(product);
  } else {
    // Ajouter directement au panier
    addToCartDirectly(product, 1);
  }
};

const openSelectionModal = (product) => {
  selectedProduct.value = product;
  showSelectionModal.value = true;
};

const closeSelectionModal = () => {
  showSelectionModal.value = false;
  selectedProduct.value = null;
};

const onProductAdded = (product, quantity) => {
  // Callback optionnel pour gérer l'ajout au panier
  console.log('Produit ajouté:', product, 'Quantité:', quantity);
};

const addToCartDirectly = (product, qty) => {
  try {
    addToCart(product, qty);
    showSuccess(`${product.nom} ajouté au panier !`);
  } catch (error) {
    showError(error.message);
  }
};

const loadProducts = async () => {
  productsLoading.value = true;
  productsError.value = '';

  try {
    const response = await productService.getActiveProducts();
    
    // Parser les champs JSON pour chaque produit
    activeProducts.value = (response.data.data || []).map(product => {
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
        ...product,
        couleurs: couleurs,
        tailles: tailles,
        imageLoaded: false
      };
    });
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    productsError.value = 'Erreur lors du chargement des produits. Veuillez réessayer.';
  } finally {
    productsLoading.value = false;
  }
};

// Charger les publicités
const loadPublicites = async () => {
  pubLoading.value = true;
  pubError.value = null;
  
  try {
    const response = await headerService.getAllHeaders();
    
    if (response.data.success && response.data.data) {
      pubData.value = response.data.data;
    } else {
      console.log('Aucune publicité trouvée, utilisation des valeurs par défaut');
    }
  } catch (error) {
    console.error('Erreur lors du chargement des publicités:', error);
    pubError.value = 'Erreur lors du chargement des publicités';
  } finally {
    pubLoading.value = false;
  }
};

// --- Initialisation ---
onMounted(() => {
  loadProducts();
  loadPublicites();
});
</script>

<style scoped>
/* Les styles spécifiques ne sont plus nécessaires pour le carrousel */
</style>
