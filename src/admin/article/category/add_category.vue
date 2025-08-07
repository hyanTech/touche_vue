<template>
    
        <!-- Breadcrumb -->
        <nav class="mb-6" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <router-link 
                        :to="{ name: 'AdminCategories' }" 
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        <i class="fas fa-tags mr-2"></i>
                        Catégories
                    </router-link>
                </li>
                <li>
                    <div class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                        <span class="text-sm font-medium text-gray-500">Ajouter</span>
                    </div>
                </li>
            </ol>
        </nav>



        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Form Section -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-8 py-6 border-b border-gray-100">
                        <h2 class="text-xl font-semibold text-gray-900">Informations de la catégorie</h2>
                        <p class="text-sm text-gray-600 mt-1">Remplissez les informations ci-dessous pour créer une nouvelle catégorie</p>
                    </div>

                    <form @submit.prevent="submitForm" class="p-8 space-y-8">
                        <!-- Nom de la catégorie -->
                        <div class="space-y-3">
                            <label for="name" class="block text-sm font-semibold text-gray-900">
                                Nom de la catégorie <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i class="fas fa-tag text-gray-400"></i>
                                </div>
                                <input
                                    v-model="form.nom"
                                    type="text"
                                    id="nom"
                                    class="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                                    placeholder="Ex: Électronique, Vêtements, Livres..."
                                    required
                                />
                            </div>
                            <p v-if="errors.nom" class="text-sm text-red-600 flex items-center">
                                <i class="fas fa-exclamation-circle mr-2"></i>
                                {{ errors.nom }}
                            </p>
                        </div>

                        <!-- Description -->
                        <div class="space-y-3">
                            <label for="description" class="block text-sm font-semibold text-gray-900">
                                Description
                            </label>
                            <textarea
                                v-model="form.description"
                                id="description"
                                rows="4"
                                class="block w-full px-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 resize-none"
                                placeholder="Décrivez brièvement cette catégorie..."
                            ></textarea>
                            <p v-if="errors.description" class="text-sm text-red-600 flex items-center">
                                <i class="fas fa-exclamation-circle mr-2"></i>
                                {{ errors.description }}
                            </p>
                            <p v-else class="text-sm text-gray-500 flex items-center">
                                <i class="fas fa-info-circle mr-2"></i>
                                Optionnel mais recommandé pour une meilleure organisation
                            </p>
                        </div>

                        <!-- Statut -->
                        <div class="space-y-3">
                            <label class="block text-sm font-semibold text-gray-900">
                                Statut de la catégorie
                            </label>
                            <div class="flex items-center space-x-6">
                                <label class="flex items-center cursor-pointer">
                                    <input
                                        v-model="form.status"
                                        type="radio"
                                        :value="true"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span class="ml-3 text-sm text-gray-700">Active</span>
                                </label>
                                <label class="flex items-center cursor-pointer">
                                    <input
                                        v-model="form.status"
                                        type="radio"
                                        :value="false"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span class="ml-3 text-sm text-gray-700">Inactive</span>
                                </label>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                            <router-link
                                :to="{ name: 'AdminCategories' }"
                                class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                            >
                                <i class="fas fa-times mr-2"></i>
                                Annuler
                            </router-link>
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
                                <i v-else class="fas fa-save mr-2"></i>
                                {{ isSubmitting ? 'Création...' : 'Créer la catégorie' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Icône Selection -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-100">
                        <h3 class="text-lg font-semibold text-gray-900">Icône de la catégorie</h3>
                        <p class="text-sm text-gray-600 mt-1">Sélectionnez une icône pour identifier visuellement votre catégorie</p>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-3 gap-3">
                            <button
                                v-for="icon in availableIcons"
                                :key="icon"
                                type="button"
                                @click="selectIcon(icon)"
                                :class="[
                                    'flex items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 hover:scale-105',
                                    selectedIcon === icon
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                ]"
                            >
                                <i :class="icon" class="text-xl"></i>
                            </button>
                        </div>
                        <p v-if="errors.icone" class="text-sm text-red-600 flex items-center mt-3">
                            <i class="fas fa-exclamation-circle mr-2"></i>
                            {{ errors.icone }}
                        </p>
                    </div>
                </div>

                <!-- Preview -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-100">
                        <h3 class="text-lg font-semibold text-gray-900">Aperçu</h3>
                        <p class="text-sm text-gray-600 mt-1">Comment votre catégorie apparaîtra</p>
                    </div>
                    <div class="p-6">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <i :class="selectedIcon" class="text-indigo-600"></i>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ form.nom || 'Nom de la catégorie' }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ form.description || 'Description de la catégorie' }}
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <span :class="[
                                        'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        form.status 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    ]">
                                        {{ form.status ? 'Active' : 'Inactive' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { categoryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'

export default {
    name: 'AddCategory',
    components: {
        
    },
    setup() {
        const router = useRouter()
        const { success, error: showError } = useNotification()
        const isSubmitting = ref(false)
        const selectedIcon = ref('fas fa-tag')


        // Form data
        const form = reactive({
            nom: '',
            description: '',
            icone: 'fas fa-tag',
            status: true
        })

        // Form errors
        const errors = reactive({
            nom: '',
            description: '',
            icone: ''
        })

        // Available icons
        const availableIcons = [
            'fas fa-tag',
            'fas fa-tags',
            'fas fa-box',
            'fas fa-shopping-bag',
            'fas fa-tshirt',
            'fas fa-book',
            'fas fa-laptop',
            'fas fa-mobile-alt',
            'fas fa-headphones',
            'fas fa-gamepad',
            'fas fa-dumbbell',
            'fas fa-home',
            'fas fa-utensils',
            'fas fa-car',
            'fas fa-bicycle',
            'fas fa-baby',
            'fas fa-gift',
            'fas fa-heart',
            'fas fa-star',
            'fas fa-crown',
            'fas fa-gem',
            'fas fa-coffee',
            'fas fa-pizza-slice',
            'fas fa-camera'
        ]

        // Methods
        const selectIcon = (icon) => {
            selectedIcon.value = icon
            form.icone = icon
        }

        const validateForm = () => {
            // Réinitialiser les erreurs
            errors.nom = ''
            errors.description = ''
            errors.icone = ''
            
            let isValid = true
            
            // Validation du nom
            if (!form.nom.trim()) {
                errors.nom = 'Le nom est requis'
                isValid = false
            } else if (form.nom.length < 2) {
                errors.nom = 'Le nom doit contenir au moins 2 caractères'
                isValid = false
            } else if (form.nom.length > 100) {
                errors.nom = 'Le nom ne peut pas dépasser 100 caractères'
                isValid = false
            }
            
            // Validation de la description (optionnelle mais si fournie)
            if (form.description && form.description.length < 10) {
                errors.description = 'La description doit contenir au moins 10 caractères'
                isValid = false
            } else if (form.description && form.description.length > 500) {
                errors.description = 'La description ne peut pas dépasser 500 caractères'
                isValid = false
            }
            
            // Validation de l'icône
            if (!form.icone.trim()) {
                errors.icone = 'L\'icône est requise'
                isValid = false
            } else if (form.icone.length > 50) {
                errors.icone = 'L\'icône ne peut pas dépasser 50 caractères'
                isValid = false
            }
            
            return isValid
        }

        const submitForm = async () => {
            if (!validateForm()) {
                return
            }

            isSubmitting.value = true

            try {
                // Préparer les données selon le schéma de l'API
                const categoryData = {
                    nom: form.nom.trim(),
                    description: form.description.trim() || undefined, // undefined si vide
                    icone: form.icone.trim(),
                    status: form.status
                }

                // Appel à l'API
                const response = await categoryService.createCategory(categoryData)
                
                console.log('Catégorie créée avec succès:', response.data)

                // Notification de succès
                success('Catégorie créée avec succès !', 'Nouvelle catégorie')

                // Redirection vers la liste des catégories
                router.push({ name: 'AdminCategories' })
            } catch (error) {
                console.error('Erreur lors de la création:', error)
                
                // Gestion des erreurs de validation de l'API
                if (error.response?.data?.errors) {
                    const apiErrors = error.response.data.errors
                    if (apiErrors.nom) errors.nom = apiErrors.nom
                    if (apiErrors.description) errors.description = apiErrors.description
                    if (apiErrors.icone) errors.icone = apiErrors.icone
                } else {
                    // Erreur générique
                    showError('Une erreur est survenue lors de la création de la catégorie')
                }
            } finally {
                isSubmitting.value = false
            }
        }

        return {
            form,
            errors,
            isSubmitting,
            selectedIcon,
            availableIcons,
            selectIcon,
            submitForm
        }
    }
}
</script>

<style scoped>
/* Custom styles for better form appearance */
.form-input:focus {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Smooth transitions for icon selection */
.icon-button {
    transition: all 0.2s ease-in-out;
}

/* Custom radio button styling */
input[type="radio"]:checked {
    background-color: #6366f1;
    border-color: #6366f1;
}

/* Hover effects for better interactivity */
button:hover {
    transform: translateY(-1px);
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>