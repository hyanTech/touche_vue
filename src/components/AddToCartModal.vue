<template>
  <div v-if="show" class="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-text-primary">Sélectionner les options</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Produit info -->
        <div class="flex items-center mb-6">
          <img :src="getImageUrl(product?.image_cover || product?.imageUrl)" :alt="product?.nom || product?.name" 
               class="w-16 h-16 object-cover rounded-lg mr-4">
          <div>
            <h4 class="font-semibold text-text-primary">{{ product?.nom || product?.name }}</h4>
            <p class="text-primary font-bold">
              {{ formatPrice(getProductPrice(product)) }} FCFA
            </p>
            <!-- <p class="text-sm text-text-secondary">Stock: {{ product?.stock }} unités</p> -->
          </div>
        </div>

        <!-- Sélection de la taille -->
        <div v-if="product?.tailles && product.tailles.length > 0" class="mb-6">
          <label class="block text-sm font-medium text-text-primary mb-3">Taille *</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="taille in product.tailles"
              :key="taille"
              @click="selectedTaille = taille"
              :class="[
                'py-2 px-3 text-sm font-medium rounded-md border transition-colors',
                selectedTaille === taille
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-primary border-gray-300 hover:border-primary'
              ]"
            >
              {{ taille }}
            </button>
          </div>
          <p v-if="!selectedTaille && showTailleError" class="text-red-500 text-sm mt-1">
            Veuillez sélectionner une taille
          </p>
        </div>

        <!-- Sélection de la couleur -->
        <div v-if="product?.couleurs && product.couleurs.length > 0" class="mb-6">
          <label class="block text-sm font-medium text-text-primary mb-3">Couleur *</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="couleur in product.couleurs"
              :key="couleur"
              @click="selectedCouleur = couleur"
              :class="[
                'py-2 px-3 text-sm font-medium rounded-md border transition-colors',
                selectedCouleur === couleur
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-primary border-gray-300 hover:border-primary'
              ]"
            >
              {{ couleur }}
            </button>
          </div>
          <p v-if="!selectedCouleur && showCouleurError" class="text-red-500 text-sm mt-1">
            Veuillez sélectionner une couleur
          </p>
        </div>

        <!-- Sélection de la quantité -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-text-primary mb-3">Quantité *</label>
          <div class="flex items-center space-x-3">
            <button
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <i class="fas fa-minus text-sm"></i>
            </button>
            <span class="w-12 text-center font-medium">{{ quantity }}</span>
            <button
              @click="increaseQuantity"
              :disabled="quantity >= product?.stock"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <i class="fas fa-plus text-sm"></i>
            </button>
          </div>
          <!-- <p class="text-sm text-text-secondary mt-1">
            Stock disponible: {{ product?.stock }} unités
          </p> -->
        </div>
      </div>

      <!-- Footer -->
      <div class="flex space-x-3 p-6 border-t border-gray-200">
        <button
          @click="closeModal"
          class="flex-1 py-2 px-4 border border-gray-300 rounded-md text-text-primary hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="confirmAddToCart"
          class="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-hover-color transition-colors"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getImageUrl, formatPrice } from '../config/utils.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
});

// Emits
const emit = defineEmits(['close', 'added']);

// Cart et Notification
const { addToCart } = useCart();
const { showSuccess, showError } = useUserNotification();

// États réactifs
const selectedTaille = ref('');
const selectedCouleur = ref('');
const quantity = ref(1);
const showTailleError = ref(false);
const showCouleurError = ref(false);

// Watchers
watch(() => props.show, (newValue) => {
  if (newValue) {
    resetForm();
  }
});

// Méthodes
const getProductPrice = (product) => {
  if (!product) return 0;
  return (product.prix_promotion && product.prix_promotion > 0) ? product.prix_promotion : product.prix;
};

const resetForm = () => {
  selectedTaille.value = '';
  selectedCouleur.value = '';
  quantity.value = 1;
  showTailleError.value = false;
  showCouleurError.value = false;
};

const closeModal = () => {
  emit('close');
  resetForm();
};

const increaseQuantity = () => {
  if (quantity.value < props.product?.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const confirmAddToCart = () => {
  // Validation
  let hasError = false;
  
  // Vérifier si le produit a des tailles et si une taille est sélectionnée
  if (props.product?.tailles && Array.isArray(props.product.tailles) && props.product.tailles.length > 0 && !selectedTaille.value) {
    showTailleError.value = true;
    hasError = true;
  } else {
    showTailleError.value = false;
  }
  
  // Vérifier si le produit a des couleurs et si une couleur est sélectionnée
  if (props.product?.couleurs && Array.isArray(props.product.couleurs) && props.product.couleurs.length > 0 && !selectedCouleur.value) {
    showCouleurError.value = true;
    hasError = true;
  } else {
    showCouleurError.value = false;
  }
  
  if (hasError) {
    return;
  }
  
  // Créer l'objet produit avec les options sélectionnées
  const productWithOptions = {
    ...props.product,
    selectedSize: selectedTaille.value || null,
    selectedColor: selectedCouleur.value || null,
    prix: getProductPrice(props.product) // S'assurer que le prix correct est transmis
  };
  
  // Ajouter au panier
  try {
    addToCart(productWithOptions, quantity.value);
    showSuccess(`${props.product?.nom || props.product?.name} ajouté au panier !`);
    emit('added', productWithOptions, quantity.value);
    closeModal();
  } catch (error) {
    showError(error.message);
  }
};
</script>

<style scoped>
/* Styles spécifiques au modal si nécessaire */
</style> 