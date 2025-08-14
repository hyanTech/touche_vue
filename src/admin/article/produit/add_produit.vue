<template>
    
        <div class="container mx-auto px-4 py-8">
            <!-- En-tête de la page -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Ajouter un nouveau produit</h1>
                <button @click="goBack" class="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Retour
                </button>
            </div>

            <!-- Conteneur principal du formulaire -->
            <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10">
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
                                             v-model="product.prix_promotion" 
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
                                <div v-if="product.image_cover" class="mt-2">
                                    <img :src="getImagePreview(product.image_cover)" class="w-full h-32 object-cover rounded-lg" />
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
                                <!-- Aperçu des images de galerie -->
                                <div v-if="product.images && product.images.length > 0" class="mt-2 grid grid-cols-2 gap-2">
                                    <div v-for="(image, index) in product.images" :key="index" class="relative">
                                        <img :src="getImagePreview(image)" class="w-full h-20 object-cover rounded-lg" />
                                        <button 
                                            @click="removeGalleryImage(index)"
                                            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
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
                            {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer le produit' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
</template>
  
  <script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { productService, categoryService } from '../../../config/api.js'
import { useNotification } from '../../../config/notification.js'

export default {
  name: 'AddProduit',
  components: {
    
  },
  setup() {
    const router = useRouter()
    const { success, error: showError } = useNotification()
    
         const isSubmitting = ref(false)
     const categories = ref([])
     
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
       images: []
     })
     
     // Fonction pour nettoyer les valeurs numériques
     const cleanNumericValue = (value) => {
       if (value === null || value === undefined || value === '' || isNaN(value)) {
         return null
       }
       return Number(value)
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
      image_cover: ''
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
       if (prixPromotion !== null && prixPromotion <= 0) {
         errors.prix_promotion = 'Le prix de promotion doit être supérieur à 0'
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
      
      // Validation de l'image de couverture
      if (!product.image_cover) {
        errors.image_cover = 'L\'image principale est requise'
        isValid = false
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
        for (let i = 0; i < files.length; i++) {
          product.images.push(files[i])
        }
      }
    }
    
    const handleImageDrop = (event, type) => {
      const files = event.dataTransfer.files
      if (type === 'cover') {
        if (files.length > 0) {
          product.image_cover = files[0]
        }
      } else if (type === 'gallery') {
        for (let i = 0; i < files.length; i++) {
          product.images.push(files[i])
        }
      }
    }
    
    const removeGalleryImage = (index) => {
      product.images.splice(index, 1)
    }
    
    const getImagePreview = (file) => {
      if (file instanceof File) {
        return URL.createObjectURL(file)
      }
      return file
    }
    
    // Soumission du formulaire
    const submitForm = async () => {
      if (!validateForm()) {
        return
      }
      
      isSubmitting.value = true
      
             try {
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
           image_cover: product.image_cover,
           images: product.images
         }
         
         // Gérer le prix de promotion (ne l'inclure que s'il a une valeur valide)
         const prixPromotion = cleanNumericValue(product.prix_promotion)
         if (prixPromotion && prixPromotion > 0) {
           productData.prix_promotion = prixPromotion
         }
        
        // Appel à l'API
        const response = await productService.createProduct(productData)
        
        console.log('Produit créé avec succès:', response.data)
        
                 // Notification de succès
         success('Produit créé avec succès !', 'Nouveau produit')
         
         // Vider tous les champs du formulaire
         resetForm()
         
         // Rester sur la page d'ajout (pas de redirection)
      } catch (error) {
        console.error('Erreur lors de la création:', error)
        
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
          showError('Une erreur est survenue lors de la création du produit')
        }
      } finally {
        isSubmitting.value = false
      }
    }
    
         // Fonction pour réinitialiser le formulaire
     const resetForm = () => {
       // Réinitialiser les données du produit
       product.nom = ''
       product.description = ''
       product.prix = null
       product.prix_promotion = null
       product.stock = 0
       product.categoryId = ''
       product.tailles = []
       product.couleurs = []
       product.etat = true
       product.image_cover = null
       product.images = []
       
       // Réinitialiser les erreurs
       Object.keys(errors).forEach(key => {
         errors[key] = ''
       })
       
       // Réinitialiser les inputs de fichiers
       if (imageCoverInput.value) {
         imageCoverInput.value.value = ''
       }
       if (imageGalleryInput.value) {
         imageGalleryInput.value.value = ''
       }
     }
     
     const goBack = () => {
       router.back()
     }
     
     // Charger les catégories au montage
     onMounted(() => {
       loadCategories()
     })
    
         return {
       product,
       errors,
       isSubmitting,
       categories,
       availableTailles,
       availableCouleurs,
       imageCoverInput,
       imageGalleryInput,
       handleImageSelect,
       handleImageDrop,
       removeGalleryImage,
       getImagePreview,
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
  