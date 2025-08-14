<template>
  <DefaultLayout>
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-8 md:py-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          {{ isDirectPurchase ? 'Acheter maintenant' : 'Finaliser votre commande' }}
        </h1>

        <div v-if="isDirectPurchase" class="mb-8 text-center">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-sm font-medium">Achat direct - Vous achetez uniquement ce produit</span>
          </div>
          
          <div class="mt-4 text-center space-y-2">
            <div class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
              <span class="text-sm font-medium">
                <button @click="addDirectPurchaseToCart" class="underline hover:no-underline">
                  Ajouter ce produit au panier
                </button>
              </span>
            </div>
            
            <div v-if="cartItems.length > 0" class="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-lg">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span class="text-sm font-medium">
                <button @click="switchToCartMode" class="underline hover:no-underline">
                  Acheter tout le panier ({{ cartItems.length }} produit(s))
                </button>
              </span>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="handleConfirmation">
          <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
            
            <div class="lg:col-span-2">
              <div class="space-y-10">
                <div class="bg-white p-6 md:p-8 rounded-xl shadow-md">
                  <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">1. Vos informations</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="nom" class="block text-sm font-medium text-gray-600 mb-2">Nom</label>
                      <input type="text" id="nom" v-model="form.nom" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition">
                    </div>
                    <div>
                      <label for="prenom" class="block text-sm font-medium text-gray-600 mb-2">Prénom</label>
                      <input type="text" id="prenom" v-model="form.prenom" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition">
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-600 mb-2">Email</label>
                      <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition">
                    </div>
                    <div>
                      <label for="numero" class="block text-sm font-medium text-gray-600 mb-2">Numéro de téléphone</label>
                      <input type="tel" id="numero" v-model="form.numero" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition">
                    </div>
                      <div class="md:col-span-2">
                      <label for="adresse" class="block text-sm font-medium text-gray-600 mb-2">Adresse de livraison</label>
                      <input type="text" id="adresse" v-model="form.adresse" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition">
                    </div>
                  </div>
                </div>

                <div class="bg-white p-6 md:p-8 rounded-xl shadow-md">
                  <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">2. Choix de la livraison</h2>
                  
                  <!-- Indicateur de chargement -->
                  <div v-if="isLoadingLivraisons" class="flex items-center justify-center py-8">
                    <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="ml-3 text-gray-600">Chargement des options de livraison...</span>
                  </div>
                  
                  <!-- Message si aucune livraison disponible -->
                  <div v-else-if="livraisons.length === 0" class="text-center py-8">
                    <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <p class="text-gray-600">Aucune option de livraison disponible pour le moment.</p>
                    <p class="text-sm text-gray-500 mt-1">Veuillez réessayer plus tard.</p>
                  </div>
                  
                  <!-- Liste des options de livraison -->
                  <div v-else class="space-y-4">
                    <div v-for="livraison in livraisons" :key="livraison.id" class="border border-gray-200 p-4 rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400 transition">
                      <label class="flex items-start cursor-pointer">
                        <input type="radio" :value="livraison.id" v-model="form.zoneLivraison" name="livraison" class="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                        <div class="ml-4 flex-grow">
                          <p class="font-semibold text-gray-800">{{ livraison.nom }}</p>
                          <p class="text-sm text-gray-600">Zones : {{ livraison.zones }}</p>
                          <p class="text-md font-bold text-blue-600 mt-1">{{ livraison.prix.toLocaleString() }} FCFA</p>
                          <button @click.prevent="showDetails(livraison)" class="text-sm text-blue-500 hover:underline mt-2">Voir les détails</button>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="bg-white p-6 md:p-8 rounded-xl shadow-md">
                    <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">3. Méthode de paiement</h2>
                    <div class="space-y-4">
                        <div class="flex flex-col md:flex-row gap-4">
                            <label class="flex items-center p-4 border rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400 transition cursor-pointer flex-1">
                                <input type="radio" value="livraison" v-model="form.typePaiement" name="typePaiement" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                                <span class="ml-3 font-medium text-gray-700">Paiement à la livraison</span>
                            </label>
                            <label class="flex items-center p-4 border rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400 transition cursor-pointer flex-1">
                                <input type="radio" value="en_ligne" v-model="form.typePaiement" name="typePaiement" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                                <span class="ml-3 font-medium text-gray-700">Paiement en ligne</span>
                            </label>
                        </div>
                        
                        <div v-if="form.typePaiement === 'en_ligne'" class="pl-4 pt-4 border-t mt-4 space-y-4 animate-fade-in">
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-3">Sélectionnez une option :</p>
                                <div class="flex flex-col sm:flex-row gap-3">
                                    <label class="flex items-center p-3 border rounded-lg has-[:checked]:bg-green-50 has-[:checked]:border-green-400 transition cursor-pointer flex-1">
                                        <input type="radio" value="FLOOZ" v-model="form.methodePaiementEnLigne" name="methodePaiementEnLigne" class="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500">
                                        <img src="/src/assets/moov.png" alt="Moov Money" class="w-8 h-8 ml-3 mr-2 object-contain">
                                        <span class="text-gray-700">Moov Money</span>
                                    </label>
                                    <label class="flex items-center p-3 border rounded-lg has-[:checked]:bg-yellow-50 has-[:checked]:border-yellow-400 transition cursor-pointer flex-1">
                                        <input type="radio" value="TMONEY" v-model="form.methodePaiementEnLigne" name="methodePaiementEnLigne" class="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500">
                                        <img src="/src/assets/mixx.png" alt="MIXX by YAS" class="w-8 h-8 ml-3 mr-2 object-contain">
                                        <span class="text-gray-700">MIXX by YAS</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div v-if="form.methodePaiementEnLigne" class="animate-fade-in">
                                <label for="numeroPaiement" class="block text-sm font-medium text-gray-600 mb-2">
                                    Numéro de téléphone pour le paiement
                                </label>
                                <div class="relative flex items-center">
                                    <span class="inline-flex items-center pl-3 pr-2 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
                                        🇹🇬 +228
                                    </span>
                                                                         <input type="tel" 
                                            id="numeroPaiement" 
                                            v-model="form.numeroPaiement" 
                                            maxlength="11" 
                                            placeholder="XX XX XX XX"
                                            class="w-full px-4 py-2 border rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': numeroPaiementError }"
                                            @input="formatNumeroPaiement">
                                </div>
                                <p v-if="numeroPaiementError" class="text-red-600 text-sm mt-1">{{ numeroPaiementError }}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="bg-white p-6 md:p-8 rounded-xl shadow-md">
                    <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">4. Note (Facultatif)</h2>
                    <div>
                        <label for="note" class="block text-sm font-medium text-gray-600 mb-2">Ajoutez des instructions spéciales pour votre commande.</label>
                        <textarea id="note" v-model="form.note" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                    </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-1 mt-10 lg:mt-0">
              <div class="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">
                  {{ isDirectPurchase ? 'Résumé de votre achat' : 'Résumé de la commande' }}
                </h2>
                
                <div v-if="isDirectPurchase && directPurchaseProduct" class="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <img :src="getImageUrl(directPurchaseProduct.image_cover || directPurchaseProduct.image)" :alt="directPurchaseProduct.nom" 
                         class="w-16 h-16 object-cover rounded-md"
                         @error="handleImageError">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800">{{ directPurchaseProduct.nom }}</h3>
                      <p class="text-sm text-gray-600">Quantité: {{ directPurchaseProduct.quantity || directPurchaseProduct.qte || 1 }}</p>
                      <p class="text-sm font-bold text-blue-600">{{ formatPrice(getProductPrice(directPurchaseProduct)) }} FCFA</p>
                      <div v-if="directPurchaseProduct.selectedColor || directPurchaseProduct.selectedSize" class="text-xs text-gray-500 mt-1">
                        <span v-if="directPurchaseProduct.selectedColor">{{ directPurchaseProduct.selectedColor }}</span>
                        <span v-if="directPurchaseProduct.selectedColor && directPurchaseProduct.selectedSize"> - </span>
                        <span v-if="directPurchaseProduct.selectedSize">{{ directPurchaseProduct.selectedSize }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="!isDirectPurchase && panier.length === 0" class="text-center py-8">
                    <div class="text-gray-500 mb-4">
                        <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                        </svg>
                    </div>
                    <p class="text-gray-600 font-medium">Votre panier est vide</p>
                    <p class="text-sm text-gray-500 mt-1">Ajoutez des produits pour continuer</p>
                </div>
                
                <div v-if="!isDirectPurchase && panier.length > 0" class="space-y-4">
                    <div v-for="item in panier" :key="item.id" class="flex justify-between items-center text-sm">
                        <div class="flex items-center space-x-3 flex-1">
                            <img v-if="item.image" :src="getImageUrl(item.image)" :alt="item.nom" 
                                 class="w-12 h-12 object-cover rounded-md"
                                 @error="handleImageError">
                            <div class="flex-1">
                                <p class="text-gray-800">{{ item.nom }}</p>
                                <p class="text-gray-500">Qté: {{ item.qte || item.quantity || 1 }}</p>
                                <!-- Affichage des variantes si elles existent -->
                                <div v-if="item.selectedColor || item.selectedSize" class="text-xs text-gray-600 mt-1">
                                    <span v-if="item.selectedColor" class="mr-2">
                                        <span class="inline-block w-2 h-2 rounded-full mr-1" :class="getColorClass(item.selectedColor)"></span>
                                        {{ item.selectedColor }}
                                    </span>
                                    <span v-if="item.selectedSize" class="mr-2">
                                        Taille: {{ item.selectedSize }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p class="font-semibold text-gray-800">{{ formatPrice(getProductPrice(item) * (item.qte || item.quantity || 1)) }} FCFA</p>
                    </div>
                </div>

                <hr class="my-6">

                <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                        <p class="text-gray-600">Sous-total</p>
                        <p class="font-medium text-gray-800">{{ sousTotal.toLocaleString() }} FCFA</p>
                    </div>
                    <div v-if="form.zoneLivraison" class="flex justify-between text-sm">
                        <p class="text-gray-600">Livraison</p>
                        <p class="font-medium text-gray-800">{{ fraisLivraison.toLocaleString() }} FCFA</p>
                    </div>
                </div>

                <hr class="my-6">

                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-800">Total</p>
                    <p class="text-2xl font-bold text-blue-600">{{ prixTotal.toLocaleString() }} FCFA</p>
                </div>

                <div class="mt-8 space-y-3">
                  <button type="submit" 
                          :disabled="!isFormValid || isLoading" 
                          class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300">
                    <span>{{ isDirectPurchase ? 'Acheter maintenant' : 'Confirmer la commande' }}</span>
                  </button>
                  
                  <button v-if="isDirectPurchase" 
                          @click="addDirectPurchaseToCart" 
                          type="button"
                          :disabled="isLoading"
                          class="w-full bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="selectedLivraisonDetails" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-fast">
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 class="text-lg font-bold mb-3">{{ selectedLivraisonDetails.nom }}</h3>
            <div class="space-y-3 mb-4">
                <div>
                    <p class="text-sm font-medium text-gray-700">Zones de livraison :</p>
                    <p class="text-sm text-gray-600">{{ selectedLivraisonDetails.zones }}</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-700">Prix :</p>
                    <p class="text-lg font-bold text-blue-600">{{ selectedLivraisonDetails.prix.toLocaleString() }} FCFA</p>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-700">Description :</p>
                    <p class="text-sm text-gray-600">{{ selectedLivraisonDetails.details }}</p>
                </div>
            </div>
            <button @click="selectedLivraisonDetails = null" class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Fermer
            </button>
        </div>
    </div>

    <div v-if="isLoading" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-fast">
        <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 class="text-xl font-bold text-gray-800 mt-6">Traitement en cours...</h3>
            <p class="text-gray-600 mt-2">Veuillez patienter pendant que nous finalisons votre commande.</p>
        </div>
    </div>

  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useCart } from '../config/cart.js';
import { getImageUrl, handleImageError, formatPrice } from '../config/utils.js';
import { useUserNotification } from '../config/userNotification.js';
import { deliveryService, orderService } from '../config/api.js';

const route = useRoute();
const router = useRouter();
const { cartItems, addToCart, clearCart } = useCart();
const { showSuccess, showError } = useUserNotification();

// --- Reactive State ---
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  numero: '',
  adresse: '',
  zoneLivraison: null,
  typePaiement: null,
  methodePaiementEnLigne: null,
  numeroPaiement: '', // For online payment phone number
  note: ''
});

const isLoading = ref(false);

// --- Watchers ---
watch(() => form.value.methodePaiementEnLigne, () => {
    form.value.numeroPaiement = '';
});

watch(() => route.query.directPurchase, () => {
  initializePanier();
}, { immediate: false });

// Watcher pour écouter les changements du panier
watch(cartItems, () => {
  if (!isDirectPurchase.value) {
    updatePanierFromCart();
    
    // Rediriger si le panier devient vide seulement si on n'est pas sur la page de commande
    if (cartItems.value.length === 0 && route.path !== '/info') {
      showError('Votre panier est vide. Vous allez être redirigé vers la page d\'accueil.');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }
}, { deep: true });

const isDirectPurchase = ref(false);
const directPurchaseProduct = ref(null);
const panier = ref([]);

const livraisons = ref([]);
const isLoadingLivraisons = ref(false);

const selectedLivraisonDetails = ref(null);

// --- Computed Properties ---

const sousTotal = computed(() => {
    if (isDirectPurchase.value && directPurchaseProduct.value) {
        // Pour l'achat direct, calculer directement depuis le produit
        const quantity = directPurchaseProduct.value.quantity || directPurchaseProduct.value.qte || 1;
        return getProductPrice(directPurchaseProduct.value) * quantity;
    } else {
        // Pour le panier normal
        return panier.value.reduce((acc, item) => acc + (getProductPrice(item) * (item.qte || item.quantity || 1)), 0);
    }
});

const fraisLivraison = computed(() => {
    if (!form.value.zoneLivraison) return 0;
    const livraisonChoisie = livraisons.value.find(l => l.id === form.value.zoneLivraison);
    return livraisonChoisie ? livraisonChoisie.prix : 0;
});

const prixTotal = computed(() => {
    return sousTotal.value + fraisLivraison.value;
});

const numeroPaiementError = computed(() => {
    const numero = form.value.numeroPaiement.replace(/\s/g, '');
    const methode = form.value.methodePaiementEnLigne;

    if (!methode || !numero) return null;

    if (!/^\d{8}$/.test(numero)) {
        return 'Le numéro doit contenir exactement 8 chiffres.';
    }

    const prefix = numero.substring(0, 2);
    
    if (methode === 'FLOOZ') {
        const validPrefixes = ['99', '98', '97', '96'];
        if (!validPrefixes.includes(prefix)) {
            return 'Pour Moov, le numéro doit commencer par 99, 98, 97, ou 96.';
        }
    }
    
    if (methode === 'TMONEY') {
        const validPrefixes = ['90', '91', '92', '93', '70', '71'];
        if (!validPrefixes.includes(prefix)) {
            return 'Pour MIXX, le numéro doit commencer par 90, 91, 92, 93, 70, ou 71.';
        }
    }

    return null; // No error
});

const isFormValid = computed(() => {
  const baseInfoValid = form.value.nom && form.value.prenom && form.value.email && form.value.numero && form.value.adresse && form.value.zoneLivraison;

  if (!baseInfoValid) return false;

  if (!form.value.typePaiement) {
      return false;
  }

  if (form.value.typePaiement === 'en_ligne') {
    const numero = form.value.numeroPaiement.replace(/\s/g, '');
    return !!form.value.methodePaiementEnLigne && numero.length === 8 && !numeroPaiementError.value;
  }
  
  // Vérifier qu'il y a des produits à commander
  if (isDirectPurchase.value) {
    return !!directPurchaseProduct.value;
  } else {
    return panier.value.length > 0;
  }
});

const updatePanierFromCart = () => {
  if (!isDirectPurchase.value) {
    panier.value = cartItems.value.map(item => ({
      id: item.id,
      nom: item.name,
      qte: item.quantity,
      prix: item.price,
      image: item.image,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  }
};

const initializePanier = () => {
  const directPurchase = route.query.directPurchase === 'true';
  if (directPurchase) {
    try {
      const storedData = localStorage.getItem('directPurchaseData');
      if (storedData) {
        isDirectPurchase.value = true;
        directPurchaseProduct.value = JSON.parse(storedData);
        
       
        // Pour l'achat direct, on n'a pas besoin de dupliquer dans le panier
        // Le produit est affiché directement via directPurchaseProduct
        panier.value = [];
      } else {
        isDirectPurchase.value = false;
        updatePanierFromCart();
      }
    } catch (error) {
      console.error('Erreur de parsing:', error);
      isDirectPurchase.value = false;
      updatePanierFromCart();
    }
  } else {
    isDirectPurchase.value = false;
    updatePanierFromCart();
  }
};

// --- Methods ---

const formatNumeroPaiement = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    
    // Enforce max length of 8 digits
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    
    // Add spaces for readability: XX XX XX XX
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    form.value.numeroPaiement = formattedValue;
};

function showDetails(livraison) {
  selectedLivraisonDetails.value = {
    nom: livraison.nom,
    details: livraison.details,
    zones: livraison.zones,
    prix: livraison.prix
  };
}

async function handleConfirmation() {
  if (!isFormValid.value) {
    showError('Veuillez remplir tous les champs obligatoires correctement.');
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Préparer le panier selon le type d'achat
    let panierToSend = [];
    
    if (isDirectPurchase.value && directPurchaseProduct.value) {
      // Pour l'achat direct, créer un panier avec le produit
      panierToSend = [{
        id: directPurchaseProduct.value.id,
        nom: directPurchaseProduct.value.nom,
        qte: directPurchaseProduct.value.quantity || directPurchaseProduct.value.qte || 1,
        prix: getProductPrice(directPurchaseProduct.value),
        image: directPurchaseProduct.value.image || directPurchaseProduct.value.image_cover,
        selectedColor: directPurchaseProduct.value.selectedColor,
        selectedSize: directPurchaseProduct.value.selectedSize
      }];
    } else {
      // Pour l'achat normal, utiliser le panier existant
      panierToSend = panier.value;
    }
    
    const finalOrder = {
        ...form.value,
        panier: panierToSend,
        sousTotal: sousTotal.value,
        fraisLivraison: fraisLivraison.value,
        prixTotal: prixTotal.value,
        isDirectPurchase: isDirectPurchase.value
    }
    
    
    // Fonction de retry pour les commandes
    const retryOrder = async (orderData, maxRetries = 2) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await orderService.createOrder(orderData);
        } catch (error) {
          if (attempt === maxRetries) {
            throw error; // Relancer l'erreur si c'est la dernière tentative
          }
          // Attendre avant de réessayer (backoff exponentiel)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    };
    
    
    // Envoyer la commande vers l'API avec retry
    const response = await retryOrder(finalOrder);
    
    if (response.status === 201) {
      
      showSuccess('Commande envoyée avec succès !');
      
      if (isDirectPurchase.value) {
        localStorage.removeItem('directPurchaseData');
      }

      const orderData = response.data.data;
      
      // Redirection selon le type de paiement
      if (form.value.typePaiement === 'en_ligne') {
        // Paiement en ligne -> PayConfirm avec les données de la commande
        
        const orderState = {
          nom: orderData.nom_client,
          prenom: orderData.prenom_client,
          operateur: orderData.methode_paiement_en_ligne,
          numero: orderData.numero_paiement,
          montant: orderData.montant_final,
          commandeId: orderData.id
        };
        
        // Supprimer le panier après une commande réussie seulement si ce n'est pas un achat direct
        if (!isDirectPurchase.value) {
          clearCart();
        }
        
        // Sauvegarder dans sessionStorage comme backup
        sessionStorage.setItem('orderData', JSON.stringify(orderState));
        
        router.push({
          path: '/pay_confirm',
          
        });
      } else {
        // Paiement à la livraison -> thanksOrder
       
        router.push({
          path:'/thanks_order',
          query: {
            orderId: orderData.id
          }
          
        });
      }
    } else {
      showError('Erreur lors de l\'envoi de la commande.');
    }
  } catch (error) {
    console.error('Erreur lors de la confirmation:', error);
    
    // Gestion spécifique des erreurs de timeout
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      showError('La requête a pris trop de temps. Veuillez réessayer ou vérifier votre connexion internet.');
    } else if (error.response) {
      // Erreur avec réponse du serveur
      const status = error.response.status;
      if (status === 400) {
        showError('Données invalides. Veuillez vérifier vos informations.');
      } else if (status === 500) {
        showError('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        showError(`Erreur ${status}: ${error.response.data?.message || 'Une erreur est survenue.'}`);
      }
    } else if (error.request) {
      // Erreur de réseau
      showError('Problème de connexion. Vérifiez votre connexion internet et réessayez.');
    } else {
      // Autre type d'erreur
      showError('Une erreur inattendue est survenue. Veuillez réessayer.');
    }
  } finally {
    isLoading.value = false;
  }
}

const fetchLivraisons = async () => {
  isLoadingLivraisons.value = true;
  try {
    const response = await deliveryService.getActiveDeliveries();
    if (response.data.success) {
      livraisons.value = response.data.data.map(livraison => {
        // Parser le champ zone qui est retourné comme une chaîne JSON
        let zones = [];
        try {
          if (livraison.zone && livraison.zone !== "[]") {
            if (typeof livraison.zone === 'string') {
              zones = JSON.parse(livraison.zone);
            } else if (Array.isArray(livraison.zone)) {
              zones = livraison.zone;
            }
          }
        } catch (parseError) {
          console.warn('Erreur lors du parsing JSON pour la zone:', livraison.id, parseError);
          zones = [];
        }
        
        return {
          id: livraison.id,
          nom: livraison.nom,
          zones: zones.join(', '), // Maintenant zones est un tableau, on peut faire .join()
          prix: parseFloat(livraison.prix),
          details: livraison.description,
          etat: livraison.etat
        };
      });
      
    } else {
      showError('Erreur lors de la récupération des options de livraison');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des livraisons:', error);
    showError('Impossible de charger les options de livraison');
  } finally {
    isLoadingLivraisons.value = false;
  }
};

onMounted(() => {
  initializePanier();
  fetchLivraisons();
});

const addDirectPurchaseToCart = () => {
  if (isDirectPurchase.value && directPurchaseProduct.value) {
    try {
      // Debug: vérifier les données récupérées
      console.log('Produit récupéré pour achat direct:', directPurchaseProduct.value);
      console.log('Prix du produit:', directPurchaseProduct.value.prix, 'Prix promotion:', directPurchaseProduct.value.prix_promotion);
      
      // Utiliser la structure correcte attendue par le panier
      const productForCart = {
        ...directPurchaseProduct.value,
        // S'assurer que les propriétés essentielles sont présentes
        image_cover: directPurchaseProduct.value.image || directPurchaseProduct.value.image_cover,
        // Le panier gère automatiquement le prix avec prix_promotion || prix
      };
      
      console.log('Produit préparé pour le panier:', productForCart);
      
      addToCart(productForCart, directPurchaseProduct.value.qte);
      showSuccess(`${directPurchaseProduct.value.nom} ajouté au panier !`);
      localStorage.removeItem('directPurchaseData');
      setTimeout(() => router.push('/'), 1500);
    } catch (error) {
      showError('Erreur lors de l\'ajout au panier: ' + error.message);
    }
  }
};

const switchToCartMode = () => {
  if (window.confirm('Voulez-vous passer à l\'achat de tout votre panier ?\n\nL\'achat direct de ce produit sera annulé.')) {
    localStorage.removeItem('directPurchaseData');
    window.location.href = '/info';
  }
};

// Fonction pour obtenir le prix correct d'un produit (promotion ou prix normal)
const getProductPrice = (product) => {
  if (!product) return 0;
  return (product.prix_promotion && product.prix_promotion > 0) ? product.prix_promotion : product.prix;
};

// Fonction pour obtenir la classe CSS de couleur
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

</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Animation pour l'apparition douce du modal */
@keyframes fade-in-fast {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in-fast {
  animation: fade-in-fast 0.2s ease-out forwards;
}
</style>