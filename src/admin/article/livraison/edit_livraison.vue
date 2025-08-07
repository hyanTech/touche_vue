<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';   
import { deliveryService } from '../../../config/api.js';
import { useNotification } from '../../../config/notification.js';

const route = useRoute();
const router = useRouter();
const { success, error: showError } = useNotification();

const shippingTypeId = route.params.id;

const currentZone = ref('');
const form = ref({
    nom: '',
    description: '',
    zone: [],
    prix: null,
    etat: true
});

// Nouveaux refs pour la modification des zones
const editingZoneIndex = ref(null);
const zoneInputRef = ref(null);
const isLoading = ref(false);
const isSubmitting = ref(false);

// Charger les données de la méthode de livraison
const loadDelivery = async () => {
    isLoading.value = true;
    
    try {
        const response = await deliveryService.getDelivery(shippingTypeId);
        const deliveryData = response.data.data;
        
        form.value = {
            nom: deliveryData.nom,
            description: deliveryData.description || '',
            zone: deliveryData.zone || [],
            prix: parseFloat(deliveryData.prix),
            etat: deliveryData.etat
        };
    } catch (err) {
        console.error('Erreur lors du chargement de la méthode de livraison:', err);
        showError('Erreur lors du chargement de la méthode de livraison');
    } finally {
        isLoading.value = false;
    }
};

const addZone = () => {
    const newZone = currentZone.value.trim();
    if (newZone && !form.value.zone.includes(newZone)) {
        form.value.zone.push(newZone);
    }
    currentZone.value = '';
};

const removeZone = (index) => {
    form.value.zone.splice(index, 1);
};

// Fonction pour passer en mode édition sur une zone
const editZone = async (index) => {
    editingZoneIndex.value = index;
    // Attend que le DOM se mette à jour pour que l'input apparaisse
    await nextTick();
    // Met le focus sur l'input
    if (zoneInputRef.value) {
        zoneInputRef.value.focus();
    }
};

// Fonction pour sauvegarder la zone modifiée
const updateZone = (event, index) => {
    const updatedZoneName = event.target.value.trim();
    if (updatedZoneName) {
        form.value.zone[index] = updatedZoneName;
    } else {
        // Si le champ est vidé, on supprime la zone
        removeZone(index);
    }
    // Quitte le mode édition
    editingZoneIndex.value = null;
};

// Validation du formulaire
const validateForm = () => {
    const errors = {};
    
    if (!form.value.nom.trim()) {
        errors.nom = 'Le nom est obligatoire';
    } else if (form.value.nom.trim().length < 2) {
        errors.nom = 'Le nom doit contenir au moins 2 caractères';
    } else if (form.value.nom.trim().length > 100) {
        errors.nom = 'Le nom ne peut pas dépasser 100 caractères';
    }
    
    if (form.value.zone.length === 0) {
        errors.zone = 'Au moins une zone est requise';
    }
    
    if (!form.value.prix || form.value.prix <= 0) {
        errors.prix = 'Le prix doit être un nombre positif';
    }
    
    if (form.value.description && form.value.description.length > 1000) {
        errors.description = 'La description ne peut pas dépasser 1000 caractères';
    }
    
    return errors;
};

const submitForm = async () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
        showError('Veuillez corriger les erreurs dans le formulaire');
        console.error('Erreurs de validation:', errors);
        return;
    }
    
    isSubmitting.value = true;
    
    try {
        const updateData = {
            nom: form.value.nom.trim(),
            zone: form.value.zone,
            prix: form.value.prix,
            etat: form.value.etat
        };
        
        // Ajouter la description seulement si elle n'est pas vide
        if (form.value.description && form.value.description.trim()) {
            updateData.description = form.value.description.trim();
        }
        
        await deliveryService.updateDelivery(shippingTypeId, updateData);
        
        success(
            `La méthode de livraison "${form.value.nom}" a été mise à jour avec succès.`,
            'Méthode mise à jour'
        );
        
        // Rediriger vers la liste des méthodes de livraison
        router.push({ name: 'Shipping' });
        
    } catch (err) {
        console.error('Erreur lors de la mise à jour:', err);
        showError('Erreur lors de la mise à jour de la méthode de livraison');
    } finally {
        isSubmitting.value = false;
    }
};

const cancelEdit = () => {
    router.push({ name: 'Shipping' });
};

onMounted(() => {
    loadDelivery();
});
</script>

<template>
    
        <div class="bg-gray-100 font-sans min-h-screen">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <!-- Loading State -->
                <div v-if="isLoading" class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-blue-600 text-4xl mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Chargement de la méthode de livraison...</h3>
                    <p class="text-gray-500">Veuillez patienter</p>
                </div>

                <div v-else class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <div class="mb-6">
                        <h1 class="text-3xl font-bold text-gray-800">Modifier une Méthode de Livraison</h1>
                        <p class="text-gray-600 mt-1">Mettez à jour les informations de la méthode de livraison ci-dessous.</p>
                    </div>

                    <form @submit.prevent="submitForm">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            <div class="lg:col-span-2">
                                <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom de la méthode</label>
                                <input type="text" id="nom" v-model="form.nom" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                            </div>

                            <div class="lg:col-span-2">
                                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea id="description" v-model="form.description" rows="3" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Description optionnelle de la méthode de livraison..."></textarea>
                            </div>

                            <div class="lg:col-span-1">
                                <label for="zones" class="block text-sm font-medium text-gray-700 mb-1">Zones Concernées</label>
                                <div class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[42px]">
                                    <template v-for="(zone, index) in form.zone" :key="index">
                                        <!-- Affiche un input si on est en mode édition pour cette zone -->
                                        <input 
                                            v-if="editingZoneIndex === index"
                                            ref="zoneInputRef"
                                            type="text"
                                            :value="zone"
                                            @keydown.enter.prevent="updateZone($event, index)"
                                            @blur="updateZone($event, index)"
                                            class="bg-blue-50 text-blue-900 text-xs font-semibold px-2.5 py-1 rounded-full outline-none ring-2 ring-blue-500"
                                        />
                                        <!-- Sinon, affiche l'étiquette (tag) -->
                                        <span v-else @click="editZone(index)" class="cursor-pointer flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {{ zone }}
                                            <button @click.stop="removeZone(index)" type="button" class="text-blue-600 hover:text-blue-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>
                                    <input type="text" id="zones" v-model="currentZone" @keydown.enter.prevent="addZone" class="flex-grow bg-transparent border-none p-0 focus:ring-0 focus:outline-none sm:text-sm" placeholder="Ajouter une zone...">
                                </div>
                            </div>

                            <div>
                                <label for="prix" class="block text-sm font-medium text-gray-700 mb-1">Prix (CFA)</label>
                                <div class="relative">
                                     <input type="number" id="prix" v-model.number="form.prix" class="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                                     <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span class="text-gray-500 sm:text-sm">CFA</span>
                                     </div>
                                </div>
                            </div>

                             <div class="lg:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                                <div class="flex items-center">
                                    <button @click="form.etat = !form.etat" type="button" :class="form.etat ? 'bg-blue-600' : 'bg-gray-200'" class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span :class="form.etat ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                    </button>
                                    <span class="ml-3 text-sm font-medium" :class="form.etat ? 'text-gray-900' : 'text-gray-500'">
                                        {{ form.etat ? 'Actif' : 'Inactif' }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-4">
                            <button type="button" @click="cancelEdit" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Annuler
                            </button>
                            <button type="submit" :disabled="isSubmitting" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
                                {{ isSubmitting ? 'Mise à jour...' : 'Mettre à jour' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
</template>

<style scoped>
/* Le style est principalement géré par Tailwind CSS. */
</style>
