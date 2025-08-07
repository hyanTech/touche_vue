<template>
    
        <div class="bg-gray-100 font-sans min-h-screen">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <!-- En-tête de la page -->
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        Ajouter une Méthode de Livraison
                    </h1>
                     <p class="text-gray-600 mt-1">Remplissez les informations ci-dessous pour créer un nouveau type de livraison.</p>
                </div>

                <!-- Formulaire -->
                <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <form @submit.prevent="submitForm">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            <!-- Champ Nom -->
                            <div class="lg:col-span-2">
                                <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom de la méthode</label>
                                <input type="text" id="nom" v-model="form.nom" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Ex: Livraison Express Lomé" required>
                            </div>

                            <!-- Champ Description -->
                            <div class="lg:col-span-2">
                                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea id="description" v-model="form.description" rows="3" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Décrivez brièvement cette méthode de livraison..."></textarea>
                            </div>

                            <!-- Champ Zone Concernée (Tags Input) -->
                            <div class="lg:col-span-1">
                                <label for="zones" class="block text-sm font-medium text-gray-700 mb-1">Zones Concernées</label>
                                <!-- Le conteneur gère le style de focus pour un aspect unifié -->
                                <div class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                    <span v-for="(zone, index) in form.zone" :key="index" class="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {{ zone }}
                                        <button @click="removeZone(index)" type="button" class="text-blue-600 hover:text-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                    <!-- MISE À JOUR : focus:outline-none supprime la bordure noire par défaut -->
                                    <input type="text" id="zones" v-model="currentZone" @keydown.enter.prevent="addZone" class="flex-grow bg-transparent border-none p-0 focus:ring-0 focus:outline-none sm:text-sm" placeholder="Ajouter une zone et taper Entrée...">
                                </div>
                            </div>


                            <!-- Champ Prix -->
                            <div>
                                <label for="prix" class="block text-sm font-medium text-gray-700 mb-1">Prix (CFA)</label>
                                <div class="relative">
                                     <input type="number" id="prix" v-model.number="form.prix" class="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="1500" required>
                                     <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span class="text-gray-500 sm:text-sm">CFA</span>
                                     </div>
                                </div>
                            </div>

                            <!-- Statut -->
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

                        <!-- Actions du formulaire -->
                        <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-4">
                            <router-link 
                                :to="{ name: 'Shipping' }" 
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Annuler
                            </router-link>
                            <button 
                                type="submit" 
                                :disabled="isSubmitting"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { deliveryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'

export default {
    name: 'AddShipping',
    components: {
        
    },
    setup() {
        const router = useRouter()
        const { success, error: showError } = useNotification()
        
        const isSubmitting = ref(false)
        const currentZone = ref('')
        
        const form = reactive({
            nom: '',
            description: '',
            zone: [], // Tableau de zones comme attendu par l'API
            prix: null,
            etat: true
        })

        const addZone = () => {
            const newZone = currentZone.value.trim()
            if (newZone && !form.zone.includes(newZone)) {
                form.zone.push(newZone)
            }
            currentZone.value = '' // Réinitialiser le champ de saisie
        }

        const removeZone = (index) => {
            form.zone.splice(index, 1)
        }

        const validateForm = () => {
            if (!form.nom.trim()) {
                showError('Le nom est obligatoire')
                return false
            }
            
            if (form.nom.trim().length < 2 || form.nom.trim().length > 100) {
                showError('Le nom doit contenir entre 2 et 100 caractères')
                return false
            }
            
            if (form.zone.length === 0) {
                showError('Au moins une zone doit être spécifiée')
                return false
            }
            
            if (!form.prix || form.prix < 0) {
                showError('Le prix doit être un nombre positif')
                return false
            }
            
            if (form.description && form.description.length > 1000) {
                showError('La description ne peut pas dépasser 1000 caractères')
                return false
            }
            
            return true
        }

        const submitForm = async () => {
            if (!validateForm()) return

            isSubmitting.value = true

            try {
                const deliveryData = {
                    nom: form.nom.trim(),
                    zone: form.zone,
                    prix: parseFloat(form.prix),
                    etat: form.etat
                }
                
                // Ajouter la description seulement si elle n'est pas vide
                if (form.description && form.description.trim()) {
                    deliveryData.description = form.description.trim()
                }

                const response = await deliveryService.createDelivery(deliveryData)
                console.log('Méthode de livraison créée avec succès:', response.data)

                success('Méthode de livraison créée avec succès !', 'Ajout réussi')
                router.push({ name: 'Shipping' })
            } catch (err) {
                console.error('Erreur lors de la création:', err)
                
                if (err.response?.data?.errors) {
                    const apiErrors = err.response.data.errors
                    // Afficher la première erreur trouvée
                    const firstError = Object.values(apiErrors)[0]
                    showError(firstError)
                } else {
                    showError('Une erreur est survenue lors de la création de la méthode de livraison')
                }
            } finally {
                isSubmitting.value = false
            }
        }

        return {
            form,
            currentZone,
            isSubmitting,
            addZone,
            removeZone,
            submitForm
        }
    }
}
</script>

<style scoped>
/* Le style est principalement géré par Tailwind CSS. */
</style>
