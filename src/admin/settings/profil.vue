<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Mon Profil</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez vos informations personnelles et vos paramètres.</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-md p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Chargement du profil...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-md p-8 text-center">
        <div class="text-red-600 mb-4">
          <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur lors du chargement</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="loadProfile" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Réessayer
        </button>
      </div>

      <!-- Profile Content -->
      <div v-else>
        <!-- Profile Information Card -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Informations Personnelles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Nom complet</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.firstName }} {{ user.lastName }}</p>
            </div>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Adresse e-mail</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.email }}</p>
            </div>
            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Numéro de téléphone</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.phone || 'Non renseigné' }}</p>
            </div>
            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Rôle</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}</p>
            </div>
            <!-- Member Since -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Membre depuis</label>
              <p class="mt-1 text-lg text-gray-800">{{ formatDate(user.createdAt) }}</p>
            </div>
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Statut</label>
              <span :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="inline-flex px-2 py-1 text-sm font-medium rounded-full">
                {{ user.isActive ? 'Actif' : 'Inactif' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Address Card -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Adresse</h2>
          <div v-if="user.address">
            <p class="text-lg text-gray-800">{{ user.address }}</p>
          </div>
          <div v-else>
            <p class="text-gray-500">Aucune adresse enregistrée.</p>
          </div>
        </div>

        <!-- Actions Card -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Actions</h2>
          <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button @click="openEditModal" class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Modifier le profil
            </button>
            <button @click="toggleChangePasswordForm" class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Changer le mot de passe
            </button>
          </div>
        </div>

        <!-- Change Password Form (conditionally rendered) -->
        <div v-if="isChangePasswordFormVisible" class="bg-white rounded-xl shadow-md p-6 mt-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Changer le mot de passe</h2>
          <form @submit.prevent="updatePassword">
            <div class="space-y-4">
              <div>
                <label for="current-password" class="block text-sm font-medium text-gray-700">Mot de passe actuel *</label>
                <input type="password" id="current-password" v-model="passwordForm.current" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label for="new-password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe *</label>
                <input type="password" id="new-password" v-model="passwordForm.new" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe *</label>
                <input type="password" id="confirm-password" v-model="passwordForm.confirm" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
            <div class="mt-6 flex space-x-3">
              <button type="submit" :disabled="passwordLoading" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                {{ passwordLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe' }}
              </button>
              <button type="button" @click="toggleChangePasswordForm" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditModalVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-xl bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Modifier les informations</h3>
          <div class="mt-2 px-7 py-3">
            <form @submit.prevent="saveProfile" class="text-left space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Prénom *</label>
                <input type="text" v-model="userToEdit.firstName" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Nom *</label>
                <input type="text" v-model="userToEdit.lastName" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Numéro de téléphone</label>
                <input type="tel" v-model="userToEdit.phone" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Adresse</label>
                <textarea v-model="userToEdit.address" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
            </form>
          </div>
          <div class="items-center px-4 py-3">
            <button @click="saveProfile" :disabled="profileLoading" class="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
              {{ profileLoading ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
            <button @click="closeEditModal" class="mt-3 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { userService } from '../../config/api.js'
import { authService } from '../../config/auth.js'
import { notificationService } from '../../config/notification.js'

export default {
  name: 'Profil',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        isActive: true,
        createdAt: ''
      },
      userToEdit: null,
      isEditModalVisible: false,
      isChangePasswordFormVisible: false,
      passwordForm: {
        current: '',
        new: '',
        confirm: ''
      },
      loading: false,
      profileLoading: false,
      passwordLoading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadProfile();
  },
  methods: {
    /**
     * Charge les informations du profil utilisateur
     */
    async loadProfile() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await userService.getCurrentUser();
        this.user = response.data.data;
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        this.error = error.response?.data?.message || 'Erreur lors du chargement du profil';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Formats a date string to a more readable format.
     * @param {string} dateString - The date string to format.
     * @returns {string} - The formatted date.
     */
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },

    /**
     * Opens the edit profile modal and prepares the data for editing.
     */
    openEditModal() {
      this.userToEdit = JSON.parse(JSON.stringify(this.user));
      this.isEditModalVisible = true;
    },

    /**
     * Closes the edit profile modal.
     */
    closeEditModal() {
      this.isEditModalVisible = false;
      this.userToEdit = null;
    },

    /**
     * Saves the edited profile data and closes the modal.
     */
    async saveProfile() {
      if (!this.userToEdit.firstName || !this.userToEdit.lastName) {
        notificationService.error('Le prénom et le nom sont obligatoires', 'Erreur de validation');
        return;
      }

      this.profileLoading = true;
      
      try {
        // Créer un objet avec seulement les champs autorisés pour la mise à jour
        const updateData = {
          firstName: this.userToEdit.firstName,
          lastName: this.userToEdit.lastName,
          phone: this.userToEdit.phone || '',
          address: this.userToEdit.address || ''
        };

        console.log(updateData);

        await userService.updateCurrentUser(updateData);
        
        // Mettre à jour les données locales
        this.user = { ...this.user, ...updateData };
        this.closeEditModal();
        
        notificationService.success('Profil mis à jour avec succès', 'Profil mis à jour');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        
        if (error.response?.status === 400 && error.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          let errorMessage = 'Erreurs de validation :\n';
          apiErrors.forEach(err => {
            errorMessage += `- ${err.field}: ${err.message}\n`;
          });
          notificationService.error(errorMessage, 'Erreur de validation');
        } else {
          const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
          notificationService.error(errorMessage, 'Erreur de mise à jour');
        }
      } finally {
        this.profileLoading = false;
      }
    },

    /**
     * Toggles the visibility of the change password form.
     */
    toggleChangePasswordForm() {
      this.isChangePasswordFormVisible = !this.isChangePasswordFormVisible;
      if (!this.isChangePasswordFormVisible) {
        // Reset form when hiding
        this.passwordForm = { current: '', new: '', confirm: '' };
      }
    },

    /**
     * Handles the password update logic.
     */
    async updatePassword() {
      // Basic validation
      if (!this.passwordForm.current || !this.passwordForm.new || !this.passwordForm.confirm) {
        notificationService.error('Veuillez remplir tous les champs', 'Erreur de validation');
        return;
      }
      
      if (this.passwordForm.new !== this.passwordForm.confirm) {
        notificationService.error('Le nouveau mot de passe et la confirmation ne correspondent pas', 'Erreur de validation');
        return;
      }

      this.passwordLoading = true;
      
      try {
        await authService.changePassword(this.passwordForm.current, this.passwordForm.new);
        
        notificationService.success('Mot de passe mis à jour avec succès', 'Mot de passe mis à jour');
        
        // Reset form and hide it
        this.passwordForm = { current: '', new: '', confirm: '' };
        this.isChangePasswordFormVisible = false;
      } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        
        if (error.response?.status === 400 && error.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          let errorMessage = 'Erreurs de validation :\n';
          apiErrors.forEach(err => {
            errorMessage += `- ${err.field}: ${err.message}\n`;
          });
          notificationService.error(errorMessage, 'Erreur de validation');
        } else {
          const errorMessage = error.response?.data?.message || 'Erreur lors du changement de mot de passe';
          notificationService.error(errorMessage, 'Erreur de changement de mot de passe');
        }
      } finally {
        this.passwordLoading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
