<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header and Add Button -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-800">Gestion des Publicités</h1>
            <p class="text-sm text-gray-500 mt-1">Gérez les bannières publicitaires de votre site.</p>
        </div>
        <!-- Bouton d'ajout affiché seulement s'il n'y a pas de données -->
        <button 
          v-if="!hasData"
          @click="addAd" 
          class="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Ajouter une publicité
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-md p-8">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Chargement des publicités...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-md p-8">
        <div class="text-center">
          <!-- <div class="text-red-600 text-lg font-medium mb-2">Erreur lors du chargement</div> -->
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button @click="loadPublicites" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Réessayer
          </button>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else-if="!hasData" class="bg-white rounded-xl shadow-md p-8">
        <div class="text-center">
          <div class="text-gray-400 text-6xl mb-4">📢</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune publicité trouvée</h3>
          <p class="text-gray-600 mb-6">Commencez par ajouter votre première publicité pour attirer l'attention de vos visiteurs.</p>
        </div>
      </div>

      <!-- Advertisements Table -->
      <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">Publicités en cours</h3>
          <p class="text-sm text-gray-600 mt-1">Gérez vos publicités actives</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Image</th>
                <th scope="col" class="px-6 py-3">Titre</th>
                <th scope="col" class="px-6 py-3">Sous-titre</th>
                <th scope="col" class="px-6 py-3">Bouton</th>
                <th scope="col" class="px-6 py-3">URL</th>
                <!-- <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3 text-right">Actions</th> -->
              </tr>
            </thead>
            <tbody>
              <!-- Publicité 1 -->
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4">
                  <img 
                    :src="publicite.img1" 
                    :alt="publicite.titre_pub1" 
                    class="w-20 h-16 object-cover rounded-md"
                    @error="handleImageError"
                  >
                </td>
                <td class="px-6 py-4 font-medium text-gray-900">
                  {{ publicite.titre_pub1 }}
                </td>
                <td class="px-6 py-4 text-gray-600">
                  {{ publicite.sous_titre1 }}
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ publicite.btn1 }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <a 
                    :href="publicite.url1" 
                    target="_blank"
                    class="text-blue-600 hover:text-blue-900 text-xs truncate block max-w-xs"
                    :title="publicite.url1"
                  >
                    {{ publicite.url1 }}
                  </a>
                </td>
                <!-- <td class="px-6 py-4 text-gray-500 text-xs">
                  {{ formatDate(publicite.createdAt) }}
                </td> -->
                <!-- <td class="px-6 py-4 text-right">
                  <div class="flex justify-end items-center space-x-2">
                    <button @click="viewPublicite(1)" class="text-blue-600 hover:text-blue-900 font-medium text-xs">Voir</button>
                    <button @click="editPublicite" class="text-yellow-600 hover:text-yellow-900 font-medium text-xs">Modifier</button>
                  </div>
                </td> -->
              </tr>

              <!-- Publicité 2 -->
              <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4">
                  <img 
                    :src="publicite.img2" 
                    :alt="publicite.titre_pub2" 
                    class="w-20 h-16 object-cover rounded-md"
                    @error="handleImageError"
                  >
                </td>
                <td class="px-6 py-4 font-medium text-gray-900">
                  {{ publicite.titre_pub2 }}
                </td>
                <td class="px-6 py-4 text-gray-600">
                  {{ publicite.sous_titre2 }}
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ publicite.btn2 }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <a 
                    :href="publicite.url2" 
                    target="_blank"
                    class="text-blue-600 hover:text-blue-900 text-xs truncate block max-w-xs"
                    :title="publicite.url2"
                  >
                    {{ publicite.url2 }}
                  </a>
                </td>
                <!-- <td class="px-6 py-4 text-gray-500 text-xs">
                  {{ formatDate(publicite.updatedAt) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end items-center space-x-2">
                    <button @click="viewPublicite(2)" class="text-blue-600 hover:text-blue-900 font-medium text-xs">Voir</button>
                    <button @click="editPublicite" class="text-yellow-600 hover:text-yellow-900 font-medium text-xs">Modifier</button>
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Actions Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <!-- <div class="text-sm text-gray-600">
              ID: {{ publicite.id }} | Créé le {{ formatDate(publicite.createdAt) }}
            </div> -->
            <div class="flex space-x-2">
              <button 
                @click="editPublicite" 
                class="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded-md hover:bg-yellow-700 transition-colors"
              >
                Modifier les publicités
              </button>
              <button 
                @click="deletePublicite" 
                class="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { headerService } from '../../../config/api.js'
import { notificationService } from '../../../config/notification.js'

export default {
  name: 'Pub',
  data() {
    return {
      loading: true,
      error: null,
      publicite: null
    }
  },
  computed: {
    hasData() {
      return this.publicite !== null
    }
  },
  mounted() {
    this.loadPublicites()
  },
  methods: {
    async loadPublicites() {
      this.loading = true
      this.error = null
      
      try {
        const response = await headerService.getAllHeaders()
        
        if (response.data.success) {
          this.publicite = response.data.data
          /* notificationService.success('Publicités chargées avec succès') */
        } else {
          this.error = response.data.message || 'Erreur lors du chargement des publicités'
        }
      } catch (error) {
        console.error('Erreur lors du chargement des publicités:', error)
        this.error = error.response?.data?.message || 'Erreur de connexion au serveur'
        notificationService.error('Erreur lors du chargement des publicités')
      } finally {
        this.loading = false
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    handleImageError(event) {
      event.target.src = 'https://placehold.co/200x160/e2e8f0/4a5568?text=Image+non+disponible'
    },

    addAd() {
      this.$router.push({ name: 'CreatePub' })
    },

    viewPublicite(num) {
      const pub = num === 1 ? {
        titre: this.publicite.titre_pub1,
        sous_titre: this.publicite.sous_titre1,
        bouton: this.publicite.btn1,
        url: this.publicite.url1,
        image: this.publicite.img1
      } : {
        titre: this.publicite.titre_pub2,
        sous_titre: this.publicite.sous_titre2,
        bouton: this.publicite.btn2,
        url: this.publicite.url2,
        image: this.publicite.img2
      }
      
      notificationService.info(`Publicité ${num}: ${pub.titre}`)
    },

    editPublicite() {
      this.$router.push({ name: 'EditPub', params: { id: this.publicite.id } })
    },

    async deletePublicite() {
      if (!this.publicite) return
      
      if (confirm('Êtes-vous sûr de vouloir supprimer ces publicités ? Cette action est irréversible.')) {
        try {
          await headerService.deleteHeader(this.publicite.id)
          this.publicite = null
          notificationService.success('Publicités supprimées avec succès')
        } catch (error) {
          console.error('Erreur lors de la suppression:', error)
          notificationService.error('Erreur lors de la suppression des publicités')
        }
      }
    }
  }
}
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
  