<template>
    <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white p-8 rounded-2xl shadow-lg">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Modifier le Produit</h1>
                        <p class="text-gray-600">Mettez à jour les informations du produit ci-dessous.</p>
                    </div>
                    <button @click="goBack" class="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Retour
                    </button>
                </div>

                <!-- Formulaire principal -->
                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
                        
                        <!-- Section principale des champs (2/3 de la largeur) -->
                        <div class="lg:col-span-2">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <!-- Nom du produit -->
                                <div class="md:col-span-2">
                                    <label for="product-nom" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Nom du produit <span class="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="product-nom" 
                                        v-model="product.nom" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" 
                                        placeholder="Ex: T-shirt en coton bio"
                                        required
                                    />
                                    <p v-if="errors.nom" class="text-sm text-red-600 mt-1">{{ errors.nom }}</p>
                                </div>

                                <!-- Description -->
                                <div class="md:col-span-2">
                                    <label for="product-description" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Description <span class="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        id="product-description" 
                                        v-model="product.description" 
                                        rows="4" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" 
                                        placeholder="Décrivez les caractéristiques principales du produit..."
                                        required
                                    ></textarea>
                                    <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
                                </div>

                                <!-- Prix -->
                                <div>
                                    <label for="product-prix" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Prix <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">€</span>
                                        <input 
                                            type="number" 
                                            id="product-prix" 
                                            v-model="product.prix" 
                                            step="0.01"
                                            class="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" 
                                            placeholder="29.99"
                                            required
                                            @input="product.prix = $event.target.value === '' ? null : Number($event.target.value)"
                                        />
                                    </div>
                                    <p v-if="errors.prix" class="text-sm text-red-600 mt-1">{{ errors.prix }}</p>
                                </div>

                                <!-- Prix de promotion -->
                                <div>
                                    <label for="product-prix-promotion" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Prix de promotion
                                    </label>
                                    <div class="relative">
                                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">€</span>
                                        <input 
                                            type="number" 
                                            id="product-prix-promotion" 
                                            :value="product.prix_promotion || ''" 
                                            step="0.01"
                                            class="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" 
                                            placeholder="24.99"
                                            @input="product.prix_promotion = $event.target.value === '' ? null : Number($event.target.value)"
                                        />
                                    </div>
                                    <p v-if="errors.prix_promotion" class="text-sm text-red-600 mt-1">{{ errors.prix_promotion }}</p>
                                </div>

                                <!-- Stock -->
                                <div>
                                    <label for="product-stock" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Quantité en stock
                                    </label>
                                    <input 
                                        type="number" 
                                        id="product-stock" 
                                        v-model="product.stock" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" 
                                        placeholder="150"
                                        min="0"
                                        @input="product.stock = $event.target.value === '' ? 0 : Number($event.target.value)"
                                    />
                                    <p v-if="errors.stock" class="text-sm text-red-600 mt-1">{{ errors.stock }}</p>
                                </div>

                                <!-- Catégorie -->
                                <div>
                                    <label for="product-category" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Catégorie <span class="text-red-500">*</span>
                                    </label>
                                    <select 
                                        id="product-category" 
                                        v-model="product.categoryId" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                        required
                                    >
                                        <option disabled value="">Veuillez sélectionner une catégorie</option>
                                        <option v-for="category in categories" :key="category.id" :value="category.id">
                                            {{ category.nom }}
                                        </option>
                                    </select>
                                    <p v-if="errors.categoryId" class="text-sm text-red-600 mt-1">{{ errors.categoryId }}</p>
                                </div>

                                <!-- Tailles -->
                                <div>
                                    <label for="product-tailles" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Tailles disponibles
                                    </label>
                                    <div class="flex flex-wrap gap-2">
                                        <label v-for="taille in availableTailles" :key="taille" class="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                :value="taille" 
                                                v-model="product.tailles" 
                                                class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span class="ml-2 text-sm text-gray-700">{{ taille }}</span>
                                        </label>
                                    </div>
                                    <p v-if="errors.tailles" class="text-sm text-red-600 mt-1">{{ errors.tailles }}</p>
                                </div>

                                <!-- Couleurs -->
                                <div>
                                    <label for="product-couleurs" class="block text-sm font-semibold text-gray-700 mb-2">
                                        Couleurs disponibles
                                    </label>
                                    <div class="flex flex-wrap gap-2">
                                        <label v-for="couleur in availableCouleurs" :key="couleur" class="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                :value="couleur" 
                                                v-model="product.couleurs" 
                                                class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span class="ml-2 text-sm text-gray-700">{{ couleur }}</span>
                                        </label>
                                    </div>
                                    <p v-if="errors.couleurs" class="text-sm text-red-600 mt-1">{{ errors.couleurs }}</p>
                                </div>

                                <!-- Statut -->
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                                    <div class="flex items-center space-x-6 mt-3">
                                        <label class="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="etat" 
                                                :value="true" 
                                                v-model="product.etat" 
                                                class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span class="ml-2 text-sm text-gray-700">Actif</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="etat" 
                                                :value="false" 
                                                v-model="product.etat" 
                                                class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span class="ml-2 text-sm text-gray-700">Inactif</span>
                                        </label>
                                    </div>
                                    <p v-if="errors.etat" class="text-sm text-red-600 mt-1">{{ errors.etat }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar pour les images (1/3 de la largeur) -->
                        <div class="lg:col-span-1 mt-6 lg:mt-0 flex flex-col gap-y-8">
                            <!-- Uploader Image Principale -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Image principale <span class="text-red-500">*</span>
                                </label>
                                <div 
                                    class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors duration-300"
                                    @click="$refs.imageCoverInput.click()"
                                    @dragover.prevent
                                    @drop.prevent="handleImageDrop($event, 'cover')"
                                >
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                                <span>Télécharger</span>
                                            </label>
                                            <p class="pl-1">ou glissez-déposez</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                                    </div>
                                </div>
                                <input 
                                    ref="imageCoverInput"
                                    type="file" 
                                    class="hidden" 
                                    accept="image/*"
                                    @change="handleImageSelect($event, 'cover')"
                                />
                                <!-- Aperçu de l'image de couverture -->
                                <div v-if="product.image_cover" class="mt-2 relative">
                                    <img 
                                        :src="getImageUrl(product.image_cover)" 
                                        class="w-full h-32 object-cover rounded-lg" 
                                        alt="Image de couverture"
                                        @error="handleImageError"
                                        loading="lazy"
                                    />
                                    <button 
                                        @click="removeCoverImage"
                                        class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        title="Supprimer l'image"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Uploader Images Galerie -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Images de la galerie
                                </label>
                                
                                <div 
                                    class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors duration-300"
                                    @click="$refs.imageGalleryInput.click()"
                                    @dragover.prevent
                                    @drop.prevent="handleImageDrop($event, 'gallery')"
                                >
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                                <span>Télécharger</span>
                                            </label>
                                            <p class="pl-1">ou glissez-déposez</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                                    </div>
                                </div>
                                <input 
                                    ref="imageGalleryInput"
                                    type="file" 
                                    class="hidden" 
                                    accept="image/*"
                                    multiple
                                    @change="handleImageSelect($event, 'gallery')"
                                />
                                <p v-if="errors.images" class="text-sm text-red-600 mt-1">{{ errors.images }}</p>
                                <!-- Aperçu des images de galerie -->
                                <div v-if="(product.existing_images && product.existing_images.length > 0) || (product.new_images && product.new_images.length > 0)" class="mt-2 space-y-4">
                                    
                                    <!-- Images existantes -->
                                    <div v-if="product.existing_images && product.existing_images.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Images existantes</h4>
                                        <div class="grid grid-cols-2 gap-2">
                                            <div v-for="(image, index) in product.existing_images" :key="`existing-${index}`" class="relative group">
                                                <img 
                                                    :src="getImageUrl(image.filename || image)" 
                                                    class="w-full h-20 object-cover rounded-lg border-2 border-blue-200"
                                                    @error="handleImageError"
                                                    loading="lazy"
                                                />
                                                <button 
                                                    type="button"
                                                    @click="confirmDeleteExistingImage(index, $event)"
                                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                                    title="Supprimer définitivement de la base de données"
                                                >
                                                    ×
                                                </button>
                                                <div class="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    Existant
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Nouvelles images -->
                                    <div v-if="product.new_images && product.new_images.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Nouvelles images</h4>
                                        <div class="grid grid-cols-2 gap-2">
                                            <div v-for="(image, index) in product.new_images" :key="`new-${index}`" class="relative group">
                                                <img 
                                                    :src="getImagePreview(image)" 
                                                    class="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                                                    @error="handleImageError"
                                                    loading="lazy"
                                                />
                                                <button 
                                                    type="button"
                                                    @click="removeNewGalleryImage(index, $event)"
                                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                                    title="Supprimer de la sélection"
                                                >
                                                    ×
                                                </button>
                                                <div class="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    Nouveau
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Boutons d'action -->
                    <div class="mt-10 pt-8 border-t border-gray-200 flex justify-end space-x-4">
                        <button 
                            type="button" 
                            @click="goBack"
                            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            :disabled="isSubmitting"
                            class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-transform transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
                            {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { productService, categoryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'
import { getImageUrl, handleImageError } from '../../../config/utils.js'

export default {
    name: 'EditProduit',
    components: {
        
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const { success, error: showError } = useNotification()
        
        const isSubmitting = ref(false)
        const isLoading = ref(true)
        const categories = ref([])
        const isDeletingImage = ref(false) // Flag pour distinguer la suppression d'image
        
        // Références aux inputs de fichiers
        const imageCoverInput = ref(null)
        const imageGalleryInput = ref(null)
        
        // Données du produit selon le schéma de l'API
        const product = reactive({
            nom: '',
            description: '',
            prix: null,
            prix_promotion: null,
            stock: 0,
            categoryId: '',
            tailles: [],
            couleurs: [],
            etat: true,
            image_cover: null,
            // Séparer les images existantes des nouvelles images
            existing_images: [], // Images déjà en base de données
            new_images: [] // Nouvelles images sélectionnées
        })
        
       
        
        // Fonction pour nettoyer les valeurs numériques
        const cleanNumericValue = (value) => {
            if (value === null || value === undefined || value === '' || isNaN(value)) {
                return null
            }
            const numValue = Number(value)
            if (isNaN(numValue)) {
                return null
            }
            return numValue
        }
        
        // Fonction pour vérifier si un fichier est en double
        const isDuplicateFile = (newFile, existingFiles) => {
            return existingFiles.some(existingFile => {
                if (existingFile instanceof File && newFile instanceof File) {
                    // Comparaison pour les fichiers File
                    return existingFile.name === newFile.name && 
                           existingFile.size === newFile.size && 
                           existingFile.lastModified === newFile.lastModified
                }
                return false
            })
        }
        
        // Erreurs de validation
        const errors = reactive({
            nom: '',
            description: '',
            prix: '',
            prix_promotion: '',
            stock: '',
            categoryId: '',
            tailles: '',
            couleurs: '',
            etat: '',
            image_cover: '',
            images: '' // Nouvelle erreur pour les doublons d'images
        })
        
        // Options disponibles
        const availableTailles = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'F', '3XL', '4XL', '5XL']
        const availableCouleurs = ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Noir', 'Blanc', 'Gris', 'Rose', 'Orange', 'Violet']
        
        // Charger les catégories
        const loadCategories = async () => {
            try {
                const response = await categoryService.getCategories()
                categories.value = response.data.data || []
            } catch (err) {
                console.error('Erreur lors du chargement des catégories:', err)
                showError('Erreur lors du chargement des catégories')
            }
        }
        
        // Charger les données du produit
        const loadProduct = async () => {
            try {
                const productId = route.params.id
                const response = await productService.getProduct(productId)
                const productData = response.data.data
               
                
                // Parser les champs JSON pour les tailles et couleurs
                let tailles = []
                let couleurs = []
                
                try {
                    // Gérer les tailles
                    if (productData.tailles) {
                        if (typeof productData.tailles === 'string') {
                            if (productData.tailles === "[]" || productData.tailles === "") {
                                tailles = []
                            } else {
                                tailles = JSON.parse(productData.tailles)
                            }
                        } else if (Array.isArray(productData.tailles)) {
                            tailles = productData.tailles
                        }
                    }
                    
                    // Gérer les couleurs
                    if (productData.couleurs) {
                        if (typeof productData.couleurs === 'string') {
                            if (productData.couleurs === "[]" || productData.couleurs === "" || productData.couleurs === "false") {
                                couleurs = []
                            } else {
                                couleurs = JSON.parse(productData.couleurs)
                            }
                        } else if (Array.isArray(productData.couleurs)) {
                            couleurs = productData.couleurs
                        }
                    }
                } catch (parseError) {
                    console.warn('Erreur lors du parsing JSON pour les tailles/couleurs:', parseError)
                    tailles = []
                    couleurs = []
                }
                
                // Mapper les données du produit
                product.nom = productData.nom || ''
                product.description = productData.description || ''
                product.prix = productData.prix || null
                product.prix_promotion = productData.prix_promotion || null
                product.stock = productData.stock || 0
                product.categoryId = productData.categoryId || productData.category_id || ''
                product.tailles = tailles
                product.couleurs = couleurs
                product.etat = productData.etat !== undefined ? productData.etat : true
                product.image_cover = productData.image_cover || null
                
                // Gérer les images de galerie
                if (productData.images && Array.isArray(productData.images)) {
                    product.existing_images = productData.images
                } else if (typeof productData.images === 'string') {
                    try {
                        const parsedImages = JSON.parse(productData.images)
                        product.existing_images = Array.isArray(parsedImages) ? parsedImages : []
                    } catch (parseError) {
                        console.warn('Erreur lors du parsing JSON pour les images:', parseError)
                        product.existing_images = []
                    }
                } else {
                    product.existing_images = []
                }
                
                // Initialiser le tableau des nouvelles images
                product.new_images = []
                
               
                
            } catch (err) {
                console.error('Erreur lors du chargement du produit:', err)
                showError('Erreur lors du chargement du produit')
                router.push('/admin/article/produit')
            } finally {
                isLoading.value = false
            }
        }
        
        // Validation du formulaire
        const validateForm = () => {
            // Réinitialiser les erreurs
            Object.keys(errors).forEach(key => errors[key] = '')
            
            let isValid = true
            
            // Validation du nom
            if (!product.nom.trim()) {
                errors.nom = 'Le nom est requis'
                isValid = false
            } else if (product.nom.length < 2) {
                errors.nom = 'Le nom doit contenir au moins 2 caractères'
                isValid = false
            } else if (product.nom.length > 100) {
                errors.nom = 'Le nom ne peut pas dépasser 100 caractères'
                isValid = false
            }
            
            // Validation de la description
            if (!product.description.trim()) {
                errors.description = 'La description est requise'
                isValid = false
            } else if (product.description.length < 10) {
                errors.description = 'La description doit contenir au moins 10 caractères'
                isValid = false
            } else if (product.description.length > 1000) {
                errors.description = 'La description ne peut pas dépasser 1000 caractères'
                isValid = false
            }
            
            // Validation du prix
            const prix = cleanNumericValue(product.prix)
            if (!prix || prix <= 0) {
                errors.prix = 'Le prix doit être supérieur à 0'
                isValid = false
            }
            
            // Validation du prix de promotion (optionnel)
            const prixPromotion = cleanNumericValue(product.prix_promotion)
            if (prixPromotion !== null && prixPromotion < 0) {
                errors.prix_promotion = 'Le prix de promotion ne peut pas être négatif'
                isValid = false
            }
            
            // Validation du stock
            const stock = cleanNumericValue(product.stock)
            if (stock !== null && stock < 0) {
                errors.stock = 'Le stock ne peut pas être négatif'
                isValid = false
            }
            
            // Validation de la catégorie
            if (!product.categoryId) {
                errors.categoryId = 'La catégorie est requise'
                isValid = false
            }
            
            // Validation de l'image de couverture (au moins une image existante ou nouvelle)
            if (!product.image_cover && !product.image_cover_url) {
                errors.image_cover = 'L\'image principale est requise'
                isValid = false
            }
            
            // Validation des images de galerie (vérifier qu'il n'y a pas de doublons)
            if (product.new_images && product.new_images.length > 0) {
                const uniqueFiles = new Set()
                for (const file of product.new_images) {
                    if (file instanceof File) {
                        const fileKey = `${file.name}-${file.size}-${file.lastModified}`
                        if (uniqueFiles.has(fileKey)) {
                            errors.images = 'Des images en double ont été détectées dans la galerie'
                            isValid = false
                            break
                        }
                        uniqueFiles.add(fileKey)
                    }
                }
            }
            
            return isValid
        }
        
        // Gestion des images
        const handleImageSelect = (event, type) => {
            const files = event.target.files
            if (type === 'cover') {
                if (files.length > 0) {
                    product.image_cover = files[0]
                }
            } else if (type === 'gallery') {
                // Empêcher les doublons sur les nouvelles images
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    if (!isDuplicateFile(file, product.new_images)) {
                        product.new_images.push(file)
                    } else {
                       
                    }
                }
            }
            // Réinitialiser l'input pour permettre la sélection du même fichier
            event.target.value = ''
        }
        
        const handleImageDrop = (event, type) => {
            const files = event.dataTransfer.files
            if (type === 'cover') {
                if (files.length > 0) {
                    product.image_cover = files[0]
                }
            } else if (type === 'gallery') {
                // Empêcher les doublons sur les nouvelles images
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    if (!isDuplicateFile(file, product.new_images)) {
                        product.new_images.push(file)
                    } else {
                        
                    }
                }
            }
        }
        
        const removeCoverImage = () => {
            // Supprimer l'image de couverture (nouvelle ou existante)
            product.image_cover = null
        }
        
        const confirmDeleteExistingImage = (index, event) => {
            // Empêcher la propagation d'événements qui pourraient déclencher le formulaire
            if (event) {
                event.preventDefault()
                event.stopPropagation()
                event.stopImmediatePropagation()
            }
            
            const imageToDelete = product.existing_images[index]
            if (!imageToDelete) {
                showError('Image non trouvée')
                return
            }
            
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.`)) {
                
                removeExistingGalleryImage(index)
            }
        }
        
        const removeExistingGalleryImage = async (index) => {
            if (isDeletingImage.value) {
                
                return
            }
            
            isDeletingImage.value = true
            
            try {
                const productId = route.params.id
                const imageToDelete = product.existing_images[index]
                
                if (!imageToDelete) {
                    showError('Image non trouvée')
                    return
                }
                
                
                
                // Appel à l'API pour supprimer l'image (UNIQUEMENT DELETE)
                const response = await productService.deleteProductImage(productId, index)
               
                
                // Supprimer l'image de la liste locale
                if (product.existing_images && product.existing_images[index]) {
                    product.existing_images.splice(index, 1)
                    
                }
                
                // Notification de succès
                success('Image supprimée avec succès !', 'Suppression image')
                
            } catch (error) {
                console.error('=== ERREUR SUPPRESSION IMAGE ===')
                console.error('Erreur complète:', error)
                console.error('Status:', error.response?.status)
                console.error('Data:', error.response?.data)
                console.error('Config:', error.config)
                console.error('Méthode HTTP utilisée:', error.config?.method)
                console.error('URL appelée:', error.config?.url)
                
                // Gestion des erreurs spécifiques
                if (error.response?.status === 404) {
                    showError('Produit non trouvé. Veuillez rafraîchir la page.')
                } else if (error.response?.status === 401) {
                    showError('Session expirée. Veuillez vous reconnecter.')
                } else if (error.response?.status === 500) {
                    showError('Erreur serveur lors de la suppression. Vérifiez les logs.')
                } else if (error.response?.data?.message) {
                    showError(error.response.data.message)
                } else {
                    showError('Une erreur est survenue lors de la suppression de l\'image')
                }
                
                // Ne pas rediriger en cas d'erreur, rester sur la page
            } finally {
                isDeletingImage.value = false
            }
        }
        
        const removeNewGalleryImage = (index, event) => {
            // Empêcher la propagation d'événements qui pourraient déclencher le formulaire
            if (event) {
                event.preventDefault()
                event.stopPropagation()
            }

            // Supprimer une nouvelle image des fichiers
            if (product.new_images && product.new_images[index]) {
                const imageToRemove = product.new_images[index]
                // Nettoyer l'URL de l'objet si c'est un File
                if (imageToRemove instanceof File) {
                    // Libérer la mémoire de l'URL créée
                    const imageUrl = getImagePreview(imageToRemove)
                    if (imageUrl && imageUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(imageUrl)
                    }
                }
                product.new_images.splice(index, 1)
               
                
            }
        }
        
        const getImagePreview = (file) => {
            
            
            // Si c'est un fichier File (nouvelle image)
            if (file instanceof File) {
                return URL.createObjectURL(file)
            }
            
            // Pour les autres types, utiliser getImageUrl
            return getImageUrl(file)
        }
        
        // Fonction pour nettoyer les doublons d'images
        const cleanDuplicateImages = () => {
            if (!product.new_images || product.new_images.length === 0) {
                return
            }
            
            const uniqueFiles = []
            const seenFiles = new Set()
            
            for (const file of product.new_images) {
                if (file instanceof File) {
                    const fileKey = `${file.name}-${file.size}-${file.lastModified}`
                    if (!seenFiles.has(fileKey)) {
                        seenFiles.add(fileKey)
                        uniqueFiles.push(file)
                    } else {
                        //console.log('Doublon supprimé:', file.name)
                    }
                } else {
                    // Garder les objets non-File
                    uniqueFiles.push(file)
                }
            }
            
            product.new_images = uniqueFiles
        }
        
        // Soumission du formulaire
        const submitForm = async () => {
            if (!validateForm()) {
                return
            }
            
            isSubmitting.value = true
            
            try {
                const productId = route.params.id
                
                // Préparer les données selon le schéma de l'API
                const productData = {
                    nom: product.nom.trim(),
                    description: product.description.trim(),
                    prix: cleanNumericValue(product.prix),
                    stock: cleanNumericValue(product.stock) || 0,
                    categoryId: product.categoryId,
                    tailles: product.tailles,
                    couleurs: product.couleurs,
                    etat: product.etat,
                    // N'envoyer l'image de couverture que si c'est un File
                    image_cover: (product.image_cover instanceof File) ? product.image_cover : null,
                    // N'envoyer que les nouveaux fichiers pour upload
                    images: product.new_images
                }
                
                // Gérer le prix de promotion (inclure même si 0 pour permettre la suppression)
                const prixPromotion = cleanNumericValue(product.prix_promotion)
                if (prixPromotion !== null) {
                    productData.prix_promotion = prixPromotion
                }
                
                // Nettoyer les doublons d'images avant l'envoi
                cleanDuplicateImages()
                //console.log('productData', productData)
                // Appel à l'API
                const response = await productService.updateProduct(productId, productData)
                
                
                
                // Notification de succès
                success('Produit mis à jour avec succès !', 'Modification produit')
                
                // Redirection vers la liste des produits
                router.push('/admin/article/produit')
                
            } catch (error) {
                console.error('Erreur lors de la mise à jour:', error)
                
                // Gestion des erreurs de validation de l'API
                if (error.response?.data?.errors) {
                    const apiErrors = error.response.data.errors
                    Object.keys(apiErrors).forEach(key => {
                        if (errors.hasOwnProperty(key)) {
                            errors[key] = apiErrors[key]
                        }
                    })
                } else {
                    // Erreur générique
                    showError('Une erreur est survenue lors de la mise à jour du produit')
                }
            } finally {
                isSubmitting.value = false
            }
        }
        
        const goBack = () => {
            router.back()
        }
        
        // Charger les données au montage
        onMounted(async () => {
            await Promise.all([
                loadCategories(),
                loadProduct()
            ])
        })

        onUnmounted(() => {
            // Libérer toutes les URLs d'objets créées pour les images
            if (product.image_cover instanceof File) {
                const imageUrl = getImagePreview(product.image_cover)
                if (imageUrl && imageUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(imageUrl)
                }
            }
            
            // Libérer les URLs des nouvelles images
            product.new_images.forEach(file => {
                if (file instanceof File) {
                    const imageUrl = getImagePreview(file)
                    if (imageUrl && imageUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(imageUrl)
                    }
                }
            })
        })
        
        return {
            product,
            errors,
            isSubmitting,
            isLoading,
            categories,
            availableTailles,
            availableCouleurs,
            imageCoverInput,
            imageGalleryInput,
            handleImageSelect,
            handleImageDrop,
            removeCoverImage,
            removeNewGalleryImage,
            confirmDeleteExistingImage,
            removeExistingGalleryImage,
            getImagePreview,
            getImageUrl,
            handleImageError,
            cleanDuplicateImages,
            submitForm,
            goBack
        }
    }
}
</script>

<style>
/* Pour cacher les flèches sur les inputs de type number */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
  