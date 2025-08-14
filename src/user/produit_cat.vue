<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 py-8">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p class="mt-4 text-text-secondary">Chargement des produits...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mb-4"></i>
                    <h3 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
                    <p class="text-sm text-red-700 mb-4">{{ error }}</p>
                    <button @click="loadProducts" class="text-sm text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-md">
                        <i class="fas fa-redo mr-1"></i>Réessayer
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div v-else>
                <!-- Le titre affiche dynamiquement le nom de la catégorie -->
                <h1 v-if="category" class="text-3xl font-bold text-center mb-2 text-text-primary">
                    Produits de la catégorie : {{ category.nom }}
                </h1>
                <p v-if="category" class="text-center text-text-secondary mb-12">Découvrez notre sélection spéciale.</p>

                <!-- Grille des produits filtrés -->
                <div v-if="products.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    <!-- Boucle sur les produits de la catégorie -->
                    <div v-for="product in products" :key="product.id" 
                         class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
                         @click="showProductDetails(product)">
                        <div class="relative overflow-hidden">
                            <!-- MODIFICATION: Hauteur responsive pour l'image pour un meilleur alignement -->
                            <img :src="getImageUrl(product.image_cover)" 
                                 :alt="'Image de ' + product.nom" 
                                 class="w-full h-44 sm:h-48 md:h-52 object-cover transition-transform duration-300 hover:scale-105" 
                                 @error="handleImageError">
                            <!-- Statut du stock -->
                            <div class="absolute top-2 right-2">
                                <span :class="getStockStatusClass(product.stock)"
                                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                                    {{ getStockStatusText(product.stock) }}
                                </span>
                            </div>
                        </div>
                        <div class="p-3 sm:p-4 flex flex-col flex-grow">
                            <h2 class="text-sm sm:text-base font-semibold mb-2 text-text-primary line-clamp-2">{{ product.nom }}</h2>
                            
                            <div class="mt-auto">
                                <div class="flex items-baseline mb-3 sm:mb-4">
                                    <span class="text-base sm:text-lg font-bold text-primary">
                                        {{ formatPrice(product.prix_promotion || product.prix) }} FCFA
                                    </span>
                                    <span v-if="product.prix_promotion && product.prix_promotion > 0 && product.prix_promotion !== product.prix" class="ml-2 text-xs sm:text-sm text-text-light line-through">
                                        {{ formatPrice(product.prix) }} FCFA
                                    </span>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <button @click.stop="handleAddToCart(product)" 
                                            :disabled="product.stock === 0"
                                            class="w-full text-center px-2 py-1.5 sm:px-3 sm:py-2 bg-accent text-text-primary rounded-md hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                                        {{ product.stock === 0 ? 'Rupture' : 'Ajouter au panier' }}
                                    </button>
                                    <button @click.stop="buyNow(product)" 
                                            :disabled="product.stock === 0"
                                            class="w-full text-center px-2 py-1.5 sm:px-3 sm:py-2 bg-primary text-white rounded-md hover:bg-hover-color hover:text-white transition-colors text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                                        {{ product.stock === 0 ? 'Rupture' : 'Acheter' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Message si aucun produit n'est trouvé dans cette catégorie -->
                <div v-else class="text-center text-text-secondary mt-16">
                    <div class="bg-bg-secondary rounded-lg p-8 max-w-md mx-auto">
                        <i class="fas fa-box-open text-text-light text-4xl mb-4"></i>
                        <h3 class="text-lg font-medium text-text-primary mb-2">Aucun produit disponible</h3>
                        <p class="text-sm text-text-secondary">Il n'y a aucun produit dans cette catégorie pour le moment.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal AddToCartModal -->
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
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AddToCartModal from '../components/AddToCartModal.vue';
import { productService, categoryService } from '../config/api.js';
import { getImageUrl, handleImageError, formatPrice, getStockStatusText, getStockStatusClass } from '../config/utils.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';

const route = useRoute();
const router = useRouter();

// Cart et Notification
const { addToCart } = useCart();
const { showSuccess, showError } = useUserNotification();

// États réactifs
const products = ref([]);
const category = ref(null);
const loading = ref(false);
const error = ref('');

// États pour le modal
const showSelectionModal = ref(false);
const selectedProduct = ref(null);

// Fonctions
const loadProducts = async () => {
    loading.value = true;
    error.value = '';

    try {
        const categoryId = route.params.id;
        if (!categoryId) {
            throw new Error('ID de la catégorie manquant');
        }

        // Charger les produits de la catégorie
        const response = await productService.getProductsByCategory(categoryId);
        
        if (response.data && response.data.success && response.data.data) {
            // Mapper les données des produits pour inclure les options
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
                    nom: product.nom,
                    prix: parseFloat(product.prix),
                    prix_promotion: product.prix_promotion && parseFloat(product.prix_promotion) > 0 ? parseFloat(product.prix_promotion) : null,
                    image_cover: product.image_cover,
                    stock: product.stock,
                    category: product.category,
                    tailles: tailles,
                    couleurs: couleurs
                };
            });
            
            // Récupérer les informations de la catégorie depuis le premier produit
            if (products.value.length > 0 && products.value[0].category) {
                category.value = products.value[0].category;
            }
        } else {
            throw new Error('Format de réponse invalide');
        }
    } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        error.value = 'Erreur lors du chargement des produits. Veuillez réessayer.';
    } finally {
        loading.value = false;
    }
};

const showProductDetails = (product) => {
    router.push({ name: 'DetailsProduit', params: { id: product.id } });
};

const handleAddToCart = (product) => {
    // Vérifier si le produit a des options (tailles ou couleurs) - maintenant parsés en tableaux
    const hasOptions = (product.tailles && Array.isArray(product.tailles) && product.tailles.length > 0) || 
                      (product.couleurs && Array.isArray(product.couleurs) && product.couleurs.length > 0);
    
    if (hasOptions) {
        // Ouvrir le modal pour sélectionner les options
        selectedProduct.value = product;
        showSelectionModal.value = true;
    } else {
        // Ajouter directement au panier
        addToCartDirectly(product);
    }
};

const addToCartDirectly = (product) => {
    try {
        addToCart(product, 1);
        showSuccess(`${product.nom} ajouté au panier !`);
    } catch (error) {
        showError(error.message);
    }
};

const closeSelectionModal = () => {
    showSelectionModal.value = false;
    selectedProduct.value = null;
};

const onProductAdded = () => {
    closeSelectionModal();
    showSuccess('Produit ajouté au panier !');
};

const buyNow = (product) => {
    try {
        router.push({ name: 'DetailsProduit', params: { id: product.id } });
    } catch (error) {
        showError(error.message);
    }
};

// Initialisation
onMounted(() => {
    loadProducts();
});
</script>

<style scoped>
/* Les styles sont gérés par TailwindCSS */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
