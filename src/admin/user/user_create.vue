<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800">Ajouter un utilisateur</h1>
          <p class="text-sm text-gray-500 mt-1">Créez un nouvel utilisateur pour votre plateforme.</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="bg-white rounded-xl shadow-md p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Création de l'utilisateur...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white rounded-xl shadow-md p-8 text-center">
          <div class="text-red-600 mb-4">
            <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur lors de la création</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
        </div>

        <!-- Form Card -->
        <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 sm:p-8">
            <form @submit.prevent="createUser" class="space-y-6">
              <!-- Nom et Prénom -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input 
                    v-model="user.firstName" 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Jean">
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input 
                    v-model="user.lastName" 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dupont">
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail *</label>
                <input 
                  v-model="user.email" 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="jean.dupont@example.com">
              </div>

              <!-- Téléphone -->
              <!-- <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
                <input 
                  v-model="user.phone" 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0123456789">
              </div> -->

              <!-- Adresse -->
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <textarea 
                  v-model="user.address" 
                  id="address" 
                  name="address" 
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Rue de la Séduction, 75001 Paris"></textarea>
              </div>

              <!-- Mot de passe -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
                <input 
                  v-model="user.password" 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••">
              </div>
              
              <!-- Rôle -->
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700 mb-2">Rôle *</label>
                <select 
                  v-model="user.role" 
                  id="role" 
                  name="role" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <!-- Statut -->
              <div>
                <label class="flex items-center">
                  <input 
                    v-model="user.isActive" 
                    type="checkbox" 
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <span class="ml-2 text-sm text-gray-700">Utilisateur actif</span>
                </label>
              </div>

              <!-- Boutons d'action -->
              <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <router-link 
                  :to="{ name: 'User' }" 
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Annuler
                </router-link>
                <button 
                  type="submit" 
                  :disabled="loading || !isFormValid"
                  class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ loading ? 'Création...' : 'Créer l\'utilisateur' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { userService } from '../../config/api.js'
  import { notificationService } from '../../config/notification.js'

  export default {
    name: 'UserCreate',
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          
          address: '',
          password: '',
          role: 'user',
          isActive: true
        },
        loading: false,
        error: null
      }
    },
    computed: {
      isFormValid() {
        return this.user.firstName && 
               this.user.lastName && 
               this.user.email && 
               this.user.password && 
               this.user.role
      }
    },
    methods: {
      async createUser() {
        this.loading = true;
        this.error = null;
        
        try {
          await userService.createUser(this.user);
          
          notificationService.success(
            `Utilisateur ${this.user.firstName} ${this.user.lastName} créé avec succès`,
            'Utilisateur créé'
          );
          
          // Redirection vers la liste des utilisateurs avec un message de succès
          this.$router.push({ 
            name: 'User',
            query: { success: 'Utilisateur créé avec succès' }
          });
        } catch (error) {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          
          // Gestion des erreurs de validation de l'API
          if (error.response?.status === 400 && error.response?.data?.errors) {
            const apiErrors = error.response.data.errors;
            let errorMessage = 'Erreurs de validation :\n';
            apiErrors.forEach(err => {
              errorMessage += `- ${err.field}: ${err.message}\n`;
            });
            notificationService.error(errorMessage, 'Erreur de validation');
          } else {
            this.error = error.response?.data?.message || 'Erreur lors de la création de l\'utilisateur';
            notificationService.error(this.error, 'Erreur de création');
          }
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional scoped styles can be added here if needed. */
  </style>
  