<template>
  <DefaultLayout>
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-8 md:py-12">
        <div class="max-w-xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg class="w-9 h-9 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 21z" />
              </svg>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Confirmez votre paiement</h1>
            <p class="text-gray-600 text-lg">Vérifiez les informations avant de finaliser.</p>
          </div>

          <!-- Main Payment Card -->
          <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            
            <!-- Amount to Pay -->
            <div class="text-center border-b border-gray-200 pb-6 mb-6">
              <label class="block text-sm font-medium text-gray-500">Montant total à payer</label>
              <p class="text-4xl font-bold text-blue-600 mt-2">{{ formatMontant(orderInfo.montant) }} FCFA</p>
            </div>

            <!-- Transaction Details -->
            <div class="space-y-6">
              <!-- Payer -->
              <div>
                <h3 class="font-semibold text-gray-700 mb-3">Payeur</h3>
                <div class="flex items-center bg-gray-50 p-4 rounded-xl">
                  <span class="bg-blue-200 text-blue-700 font-bold rounded-full h-10 w-10 flex items-center justify-center text-lg">
                    {{ orderInfo.nom.charAt(0) }}{{ orderInfo.prenom.charAt(0) }}
                  </span>
                  <p class="ml-4 text-gray-800 font-medium">{{ orderInfo.nom }} {{ orderInfo.prenom }}</p>
                </div>
              </div>
              
              <!-- Payment Method -->
              <div>
                <div class="flex justify-between items-center mb-3">
                  <h3 class="font-semibold text-gray-700">Méthode de paiement</h3>
                  <button @click="openEditModal" 
                          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Modifier
                  </button>
                </div>
                <div class="flex items-center bg-gray-50 p-4 rounded-xl">
                  <img :src="getOperatorImage(selectedOperator)" :alt="getOperatorName(selectedOperator)" class="w-8 h-8 mr-4 object-contain">
                  <div>
                    <span class="font-medium text-gray-800">{{ getOperatorName(selectedOperator) }}</span>
                    <p class="text-gray-600">+228 {{ numeroPaiement }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <button @click="confirmPayment" 
                      :disabled="!isFormValid || isLoading"
                      class="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? 'Traitement...' : 'Confirmer et Payer' }}</span>
              </button>
              
              <button @click="goBack" 
                      class="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300">
                Retour
              </button>
            </div>
          </div>

          <!-- Important Information Box -->
          <div class="mt-8 bg-yellow-50/70 border border-yellow-200/80 rounded-lg p-4">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <div>
                <ul class="text-sm text-yellow-700 space-y-1">
                  <li>• Le paiement sera débité du compte mobile associé au numéro fourni.</li>
                  <li>• Vous recevrez une notification sur votre téléphone pour valider la transaction.</li>
                  <li>• En cas de problème, <a href="#" class="font-medium underline">contactez notre support</a>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Details Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Modifier le paiement</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600 mb-2">Opérateur</label>
          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button @click="editOperator = 'moov'" :class="{'bg-white shadow': editOperator === 'moov', 'text-gray-600': editOperator !== 'moov'}" class="flex-1 py-2 px-3 rounded-md flex items-center justify-center transition-all duration-200">
              <img src="/src/assets/moov.png" alt="Moov Money" class="w-6 h-6 mr-2 object-contain">
              Moov
            </button>
            <button @click="editOperator = 'mixx'" :class="{'bg-white shadow': editOperator === 'mixx', 'text-gray-600': editOperator !== 'mixx'}" class="flex-1 py-2 px-3 rounded-md flex items-center justify-center transition-all duration-200">
              <img src="/src/assets/mixx.png" alt="MIXX by YAS" class="w-6 h-6 mr-2 object-contain">
              MIXX
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label for="editNumeroPaiement" class="block text-sm font-medium text-gray-600 mb-2">Numéro de téléphone</label>
          <div class="relative flex items-center">
            <span class="inline-flex items-center pl-3 pr-2 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
              🇹🇬 +228
            </span>
            <input type="tel" id="editNumeroPaiement" v-model="editNumeroPaiement" maxlength="11" placeholder="XX XX XX XX"
                   class="w-full px-4 py-2 border rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition"
                   :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': editNumeroPaiementError }"
                   @input="formatEditNumeroPaiement">
          </div>
          <p v-if="editNumeroPaiementError" class="text-red-600 text-sm mt-1">{{ editNumeroPaiementError }}</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button @click="closeEditModal" class="bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Annuler
          </button>
          <button @click="saveChanges" :disabled="!isEditFormValid" class="bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
    
    <!-- Pending Confirmation Modal -->
    <div v-if="showPendingModal" class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <div class="relative w-16 h-16 mx-auto">
            <svg class="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
            </div>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mt-6">En attente de confirmation</h3>
        <p class="text-gray-600 mt-2">Veuillez vérifier la notification sur votre téléphone pour approuver la transaction.</p>
      </div>
    </div>

  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useUserNotification } from '../config/userNotification.js';
import { orderService } from '../config/api.js';

const route = useRoute();
const router = useRouter();
const { showSuccess, showError } = useUserNotification();

// --- Reactive State ---
const isLoading = ref(false);
const showPendingModal = ref(false); // New state for the pending modal
const selectedOperator = ref('');
const numeroPaiement = ref('');
const showEditModal = ref(false);
const editOperator = ref('');
const editNumeroPaiement = ref('');

// --- Computed Properties ---
const orderInfo = computed(() => {
  let state = route.state || router.currentRoute.value.state || {};
  if (!state.nom && !state.prenom) {
    try {
      const storedData = sessionStorage.getItem('orderData');
      if (storedData) {
        state = JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération depuis sessionStorage:', error);
    }
  }
  return {
    nom: state.nom || 'John',
    prenom: state.prenom || 'Doe',
    operateur: state.operateur || 'moov',
    numero: state.numero || '99 88 77 66',
    montant: state.montant || '15000',
    commandeId: state.commandeId || ''
  };
});

const numeroPaiementError = computed(() => {
  const numero = numeroPaiement.value.replace(/\s/g, '');
  const methode = selectedOperator.value;
  if (!methode || !numero) return null;
  if (!/^\d{8}$/.test(numero)) return 'Le numéro doit contenir 8 chiffres.';
  const prefix = numero.substring(0, 2);
  if (methode === 'moov') {
    const validPrefixes = ['99', '98', '97', '96'];
    if (!validPrefixes.includes(prefix)) return 'Numéro Moov invalide.';
  }
  if (methode === 'mixx') {
    const validPrefixes = ['90', '91', '92', '93', '70', '71'];
    if (!validPrefixes.includes(prefix)) return 'Numéro MIXX invalide.';
  }
  return null;
});

const editNumeroPaiementError = computed(() => {
  const numero = editNumeroPaiement.value.replace(/\s/g, '');
  const methode = editOperator.value;
  if (!methode || !numero) return null;
  if (!/^\d{8}$/.test(numero)) return 'Le numéro doit contenir 8 chiffres.';
  const prefix = numero.substring(0, 2);
  if (methode === 'moov') {
    const validPrefixes = ['99', '98', '97', '96'];
    if (!validPrefixes.includes(prefix)) return 'Pour Moov, le numéro doit commencer par 99, 98, 97, ou 96.';
  }
  if (methode === 'mixx') {
    const validPrefixes = ['90', '91', '92', '93', '70', '71'];
    if (!validPrefixes.includes(prefix)) return 'Pour MIXX, le numéro doit commencer par 90, 91, 92, 93, 70, ou 71.';
  }
  return null;
});

const isFormValid = computed(() => {
  const numero = numeroPaiement.value.replace(/\s/g, '');
  return !!selectedOperator.value && numero.length === 8 && !numeroPaiementError.value;
});

const isEditFormValid = computed(() => {
  const numero = editNumeroPaiement.value.replace(/\s/g, '');
  return !!editOperator.value && numero.length === 8 && !editNumeroPaiementError.value;
});

// --- Methods ---
const formatEditNumeroPaiement = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  if (value.length > 8) value = value.slice(0, 8);
  editNumeroPaiement.value = value.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
};

const formatMontant = (montant) => {
  if (!montant) return '0';
  return parseFloat(montant).toLocaleString('fr-FR');
};

const getOperatorName = (operator) => {
  const operators = { 'moov_money': 'Moov Money', 'mixx_by_yas': 'MIXX by YAS' };
  return operators[operator] || operator;
};

const getOperatorImage = (operator) => {
  const images = { 'moov': '/src/assets/moov.png', 'mixx': '/src/assets/mixx.png' };
  return images[operator] || '';
};

const openEditModal = () => {
  editOperator.value = selectedOperator.value;
  editNumeroPaiement.value = numeroPaiement.value;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveChanges = () => {
  if (!isEditFormValid.value) {
    showError('Veuillez vérifier vos informations.');
    return;
  }
  selectedOperator.value = editOperator.value;
  numeroPaiement.value = editNumeroPaiement.value;
  showSuccess('Informations de paiement mises à jour !');
  closeEditModal();
};

const confirmPayment = async () => {
  if (!isFormValid.value) {
    showError('Veuillez vérifier vos informations de paiement.');
    return;
  }
  isLoading.value = true;
  try {
    
   
      // 2. Stop the button loader and show the pending modal
      isLoading.value = false;
      showPendingModal.value = true;
      showSuccess('Paiement initié !');

      // 3. Simulate the 10-second wait for user confirmation on their phone
      await new Promise(resolve => setTimeout(resolve, 10000));

      // 4. Appel à l'API de validation du paiement
      const paymentData = {
        operateur: selectedOperator.value === 'moov' ? 'moov_money' : 'mixx_by_yas',
        numero: numeroPaiement.value.replace(/\s/g, ''),
        montant: parseFloat(orderInfo.value.montant)
      };

      const validationResponse = await orderService.validateOnlinePayment(orderInfo.value.commandeId, paymentData);
      
      if (validationResponse.status === 200) {
        //console.log(validationResponse.data.data);
        // 5. Hide the modal, show final success, and redirect
        showPendingModal.value = false;
        showSuccess('Confirmation reçue ! Paiement réussi.');
        sessionStorage.removeItem('orderData');
        
        // Redirect after a short delay to allow user to read the final success message
        setTimeout(() => {
            router.push({
              path: '/thanks_order',
              query: {
                orderId: validationResponse.data.data.id
              }
            });
        }, 1000);
     
    } else {
      throw new Error(testResponse.data.message || 'Erreur lors du test de la commande');
    }

  } catch (error) {
    console.error('Erreur de confirmation:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Erreur lors du paiement. Veuillez réessayer.';
    showError(errorMessage);
    isLoading.value = false; // Ensure loader is off on error
    showPendingModal.value = false; // Ensure modal is hidden on error
  }
};

const goBack = () => {
  sessionStorage.removeItem('orderData');
  router.go(-1);
};

// --- Lifecycle ---
onMounted(() => {
  selectedOperator.value = orderInfo.value.operateur;
  numeroPaiement.value = orderInfo.value.numero;
});
</script>

<style scoped>
/* No specific styles needed here anymore */
</style>
