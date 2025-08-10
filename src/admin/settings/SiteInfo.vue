<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Informations du Site</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez le contenu des pages statiques comme "À propos" ou les termes légaux.</p>
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
          <button @click="fetchSiteInfo" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Réessayer
          </button>
        </div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- About Us Section -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <h2 class="text-xl font-semibold text-gray-800">À Propos de Nous</h2>
            <button v-if="editingSection !== 'a_propos'" @click="startEditing('a_propos')" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Modifier
            </button>
          </div>
          <div v-if="editingSection === 'a_propos'">
            <textarea v-model="tempContent" rows="10" class="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Entrez le contenu de la section À propos..."></textarea>
            <div class="flex justify-end space-x-4 mt-4">
              <button @click="cancelEditing" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">Annuler</button>
              <button @click="saveChanges" :disabled="submitting" class="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </div>
          <div v-else class="prose max-w-none text-gray-600">
            <div v-if="siteInfo.a_propos" v-html="formatContent(siteInfo.a_propos)"></div>
            <div v-else class="text-gray-400 italic">Aucun contenu configuré</div>
          </div>
        </div>

        <!-- Privacy Policy Section -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Politique de Confidentialité</h2>
            <button v-if="editingSection !== 'confidentialite'" @click="startEditing('confidentialite')" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Modifier
            </button>
          </div>
          <div v-if="editingSection === 'confidentialite'">
            <textarea v-model="tempContent" rows="10" class="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Entrez le contenu de la politique de confidentialité..."></textarea>
            <div class="flex justify-end space-x-4 mt-4">
              <button @click="cancelEditing" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">Annuler</button>
              <button @click="saveChanges" :disabled="submitting" class="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </div>
          <div v-else class="prose max-w-none text-gray-600">
            <div v-if="siteInfo.confidentialite" v-html="formatContent(siteInfo.confidentialite)"></div>
            <div v-else class="text-gray-400 italic">Aucun contenu configuré</div>
          </div>
        </div>

        <!-- Terms & Conditions Section -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Termes & Conditions</h2>
            <button v-if="editingSection !== 'terme'" @click="startEditing('terme')" class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Modifier
            </button>
          </div>
          <div v-if="editingSection === 'terme'">
            <textarea v-model="tempContent" rows="10" class="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Entrez le contenu des termes et conditions..."></textarea>
            <div class="flex justify-end space-x-4 mt-4">
              <button @click="cancelEditing" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">Annuler</button>
              <button @click="saveChanges" :disabled="submitting" class="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </div>
          <div v-else class="prose max-w-none text-gray-600">
            <div v-if="siteInfo.terme" v-html="formatContent(siteInfo.terme)"></div>
            <div v-else class="text-gray-400 italic">Aucun contenu configuré</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { informationService } from '../../config/api'
import { notificationService } from '../../config/notification'

// État réactif
const loading = ref(true)
const error = ref(null)
const editingSection = ref(null)
const tempContent = ref('')
const submitting = ref(false)

// Données des informations du site
const siteInfo = reactive({
  id: null,
  a_propos: '',
  confidentialite: '',
  terme: ''
})

// Récupérer les informations du site
const fetchSiteInfo = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await informationService.getAllInformations()
    
    if (response.data.success && response.data.data) {
      // Prendre la première information (la réponse contient directement l'objet)
      const information = response.data.data
      Object.assign(siteInfo, information)
    } else {
      error.value = 'Aucune information trouvée'
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des informations:', err)
    error.value = 'Erreur lors du chargement des informations du site'
  } finally {
    loading.value = false
  }
}

// Commencer l'édition d'une section
const startEditing = (section) => {
  editingSection.value = section
  tempContent.value = siteInfo[section] || ''
}

// Annuler l'édition
const cancelEditing = () => {
  editingSection.value = null
  tempContent.value = ''
}

// Sauvegarder les modifications
const saveChanges = async () => {
  if (!editingSection.value) return

  submitting.value = true

  try {
    const dataToSend = {
      [editingSection.value]: tempContent.value
    }

    if (siteInfo.id) {
      // Mise à jour d'une information existante
      const response = await informationService.updateInformation(siteInfo.id, dataToSend)
      
      if (response.data.success) {
        siteInfo[editingSection.value] = tempContent.value
        notificationService.success('Section mise à jour avec succès')
        editingSection.value = null
        tempContent.value = ''
      } else {
        notificationService.error(response.data.message || 'Erreur lors de la mise à jour')
      }
    } else {
      // Création d'une nouvelle information
      const response = await informationService.createInformation(dataToSend)
      
      if (response.data.success) {
        Object.assign(siteInfo, response.data.data)
        notificationService.success('Section créée avec succès')
        editingSection.value = null
        tempContent.value = ''
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

// Formater le contenu pour l'affichage HTML
const formatContent = (content) => {
  if (!content) return ''
  
  // Vérifier si le contenu contient déjà du HTML
  const htmlRegex = /<[^>]*>/g
  if (htmlRegex.test(content)) {
    // Si le contenu contient du HTML, l'afficher tel quel
    return content
  }
  
  // Sinon, convertir les retours à la ligne en paragraphes HTML
  return content
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('')
}

// Charger les données au montage du composant
onMounted(() => {
  fetchSiteInfo()
})
</script>

<style scoped>
/* Styles pour le contenu formaté */
.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.prose h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.prose p:first-child {
  margin-top: 0;
}
</style>
  