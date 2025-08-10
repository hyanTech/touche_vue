<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Informations de Contact</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez les coordonnées et les réseaux sociaux du site.</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-2 text-gray-600">Chargement...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-md p-6">
        <div class="text-center">
          <div class="text-red-600 text-xl mb-2">⚠️ Erreur</div>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button @click="fetchContactInfo" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Réessayer
          </button>
        </div>
      </div>

      <!-- Contact Info Card -->
      <div v-else class="bg-white rounded-xl shadow-md p-6">
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Coordonnées</h2>
          <button v-if="!isEditing" @click="startEditing" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
            Modifier
          </button>
        </div>

        <!-- View Mode -->
        <div v-if="!isEditing" class="space-y-6">
          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-500">Numéro de téléphone</label>
            <p class="mt-1 text-lg text-gray-800">{{ contactInfo.numero }}</p>
          </div>
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-500">Email</label>
            <p class="mt-1 text-lg text-gray-800">{{ contactInfo.email }}</p>
          </div>
          <!-- Address -->
          <div>
            <label class="block text-sm font-medium text-gray-500">Adresse</label>
            <p class="mt-1 text-lg text-gray-800">{{ contactInfo.adresse }}</p>
          </div>
          <!-- Social Media -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-2">Réseaux Sociaux</label>
            <div class="flex flex-wrap gap-4">
              <a v-if="contactInfo.lien_whatsapp && contactInfo.lien_whatsapp.trim()" :href="contactInfo.lien_whatsapp" target="_blank" class="text-gray-600 hover:text-green-600 flex items-center space-x-2">
                <i class="fab fa-whatsapp-square text-2xl"></i>
                <span class="hidden sm:inline">WhatsApp</span>
              </a>
              <a v-if="contactInfo.lien_facebook && contactInfo.lien_facebook.trim()" :href="contactInfo.lien_facebook" target="_blank" class="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
                <i class="fab fa-facebook-square text-2xl"></i>
                <span class="hidden sm:inline">Facebook</span>
              </a>
              <a v-if="contactInfo.lien_insta && contactInfo.lien_insta.trim()" :href="contactInfo.lien_insta" target="_blank" class="text-gray-600 hover:text-pink-600 flex items-center space-x-2">
                <i class="fab fa-instagram-square text-2xl"></i>
                <span class="hidden sm:inline">Instagram</span>
              </a>
              <a v-if="contactInfo.lien_tiktok && contactInfo.lien_tiktok.trim()" :href="contactInfo.lien_tiktok" target="_blank" class="text-gray-600 hover:text-black flex items-center space-x-2">
                <i class="fab fa-tiktok text-2xl"></i>
                <span class="hidden sm:inline">TikTok</span>
              </a>
              <a v-if="contactInfo.lien_x && contactInfo.lien_x.trim()" :href="contactInfo.lien_x" target="_blank" class="text-gray-600 hover:text-gray-800 flex items-center space-x-2">
                <i class="fab fa-twitter-square text-2xl"></i>
                <span class="hidden sm:inline">X (Twitter)</span>
              </a>
            </div>
            <!-- Message si aucun réseau social configuré -->
            <div v-if="!hasAnySocialMedia" class="text-gray-400 text-sm mt-2">
              Aucun réseau social configuré
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="space-y-6">
          <!-- Phone Number -->
          <div>
            <label for="numero" class="block text-sm font-medium text-gray-700">Numéro de téléphone *</label>
            <input type="text" id="numero" v-model="tempContactInfo.numero" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email *</label>
            <input type="email" id="email" v-model="tempContactInfo.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <!-- Address -->
          <div>
            <label for="adresse" class="block text-sm font-medium text-gray-700">Adresse *</label>
            <input type="text" id="adresse" v-model="tempContactInfo.adresse" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <!-- Social Media -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Réseaux Sociaux</label>
            <p class="text-xs text-gray-500 mb-3">Laissez vide pour supprimer le lien. Les champs vides seront automatiquement supprimés.</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <i class="fab fa-whatsapp-square text-2xl w-8 text-center mr-4 text-green-500"></i>
                <input type="url" placeholder="Lien WhatsApp (optionnel)" v-model="tempContactInfo.lien_whatsapp" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="flex items-center">
                <i class="fab fa-facebook-square text-2xl w-8 text-center mr-4 text-blue-500"></i>
                <input type="url" placeholder="Lien Facebook (optionnel)" v-model="tempContactInfo.lien_facebook" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="flex items-center">
                <i class="fab fa-instagram-square text-2xl w-8 text-center mr-4 text-pink-500"></i>
                <input type="url" placeholder="Lien Instagram (optionnel)" v-model="tempContactInfo.lien_insta" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="flex items-center">
                <i class="fab fa-tiktok text-2xl w-8 text-center mr-4 text-black"></i>
                <input type="url" placeholder="Lien TikTok (optionnel)" v-model="tempContactInfo.lien_tiktok" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="flex items-center">
                <i class="fab fa-twitter-square text-2xl w-8 text-center mr-4 text-gray-500"></i>
                <input type="url" placeholder="Lien X (Twitter) (optionnel)" v-model="tempContactInfo.lien_x" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-4">
            <button @click="cancelEditing" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
              Annuler
            </button>
            <button @click="saveChanges" :disabled="submitting" class="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ submitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { contactService } from '../../config/api'
import { notificationService } from '../../config/notification'

// État réactif
const loading = ref(true)
const error = ref(null)
const isEditing = ref(false)
const submitting = ref(false)

// Données de contact
const contactInfo = reactive({
  id: null,
  numero: '',
  email: '',
  adresse: '',
  lien_whatsapp: '',
  lien_facebook: '',
  lien_insta: '',
  lien_tiktok: '',
  lien_x: ''
})

// Données temporaires pour l'édition
const tempContactInfo = reactive({
  numero: '',
  email: '',
  adresse: '',
  lien_whatsapp: '',
  lien_facebook: '',
  lien_insta: '',
  lien_tiktok: '',
  lien_x: ''
})

// Computed property pour vérifier s'il y a des réseaux sociaux configurés
const hasAnySocialMedia = computed(() => {
  return contactInfo.lien_whatsapp?.trim() || 
         contactInfo.lien_facebook?.trim() || 
         contactInfo.lien_insta?.trim() || 
         contactInfo.lien_tiktok?.trim() || 
         contactInfo.lien_x?.trim()
})

// Récupérer les informations de contact
const fetchContactInfo = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Récupérer le premier contact (ID 1) ou tous les contacts
    const response = await contactService.getAllContacts()
    
    if (response.data.success && response.data.data) {
      // Prendre le premier contact (la réponse contient directement l'objet contact)
      const contact = response.data.data
      Object.assign(contactInfo, contact)
    } else {
      // Si aucun contact n'existe, créer un contact par défaut
      error.value = 'Aucune information de contact trouvée'
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des contacts:', err)
    error.value = 'Erreur lors du chargement des informations de contact'
  } finally {
    loading.value = false
  }
}

// Commencer l'édition
const startEditing = () => {
  Object.assign(tempContactInfo, contactInfo)
  isEditing.value = true
}

// Annuler l'édition
const cancelEditing = () => {
  isEditing.value = false
  Object.assign(tempContactInfo, contactInfo)
}

// Validation des URLs
const isValidUrl = (string) => {
  if (!string || string.trim() === '') return true // URL vide est valide (sera null)
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Sauvegarder les modifications
const saveChanges = async () => {
  // Validation des champs obligatoires
  if (!tempContactInfo.numero || !tempContactInfo.email || !tempContactInfo.adresse) {
    notificationService.error('Veuillez remplir tous les champs obligatoires')
    return
  }

  // Validation des URLs si elles sont renseignées
  const socialUrls = [
    { field: 'lien_whatsapp', name: 'WhatsApp' },
    { field: 'lien_facebook', name: 'Facebook' },
    { field: 'lien_insta', name: 'Instagram' },
    { field: 'lien_tiktok', name: 'TikTok' },
    { field: 'lien_x', name: 'X (Twitter)' }
  ]

  for (const url of socialUrls) {
    if (tempContactInfo[url.field] && tempContactInfo[url.field].trim() && !isValidUrl(tempContactInfo[url.field])) {
      notificationService.error(`L'URL ${url.name} n'est pas valide`)
      return
    }
  }

  submitting.value = true

  try {
    // Préparer les données en convertissant les champs vides en null
    const dataToSend = {
      numero: tempContactInfo.numero,
      email: tempContactInfo.email,
      adresse: tempContactInfo.adresse,
      lien_whatsapp: tempContactInfo.lien_whatsapp?.trim() || null,
      lien_facebook: tempContactInfo.lien_facebook?.trim() || null,
      lien_insta: tempContactInfo.lien_insta?.trim() || null,
      lien_tiktok: tempContactInfo.lien_tiktok?.trim() || null,
      lien_x: tempContactInfo.lien_x?.trim() || null
    }

    if (contactInfo.id) {
      // Mise à jour d'un contact existant
      const response = await contactService.updateContact(contactInfo.id, dataToSend)
      
      if (response.data.success) {
        Object.assign(contactInfo, tempContactInfo)
        notificationService.success('Informations de contact mises à jour avec succès')
        isEditing.value = false
      } else {
        notificationService.error(response.data.message || 'Erreur lors de la mise à jour')
      }
    } else {
      // Création d'un nouveau contact
      const response = await contactService.createContact(dataToSend)
      
      if (response.data.success) {
        Object.assign(contactInfo, response.data.data)
        notificationService.success('Informations de contact créées avec succès')
        isEditing.value = false
      } else {
        notificationService.error(response.data.message || 'Erreur lors de la création')
      }
    }
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err)
    notificationService.error(err.response?.data?.message || 'Erreur de connexion au serveur')
  } finally {
    submitting.value = false
  }
}

// Charger les données au montage du composant
onMounted(() => {
  fetchContactInfo()
})
</script>

<style scoped>
/* Styles additionnels si nécessaire */
</style>
  