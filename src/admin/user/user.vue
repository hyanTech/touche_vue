<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Utilisateurs</h1>
            <p class="text-sm text-gray-500 mt-1">Gérez les utilisateurs de votre plateforme.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:flex sm:items-center sm:space-x-4">
              <!-- Search Input -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  class="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm pl-10 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                  placeholder="Rechercher un utilisateur...">
              </div>
              <!-- Add User Button -->
                             <router-link :to="{ name: 'UserCreate' }"  class="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Ajouter un utilisateur
              </router-link>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="bg-white rounded-xl shadow-md p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Chargement des utilisateurs...</p>
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
          <button @click="loadUsers" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Réessayer
          </button>
        </div>
  
        <!-- User List Card -->
        <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
          <!-- User Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Utilisateur</th>
                  <th scope="col" class="px-6 py-3">Rôle</th>
                  <th scope="col" class="px-6 py-3">Statut</th>
                  <th scope="col" class="px-6 py-3">Inscrit le</th>
                  <th scope="col" class="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop through filtered users -->
                <tr v-for="user in filteredUsers" :key="user.id" class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-600">
                          {{ getUserInitials(user.firstName, user.lastName) }}
                        </span>
                      </div>
                      <div class="ml-4">
                        <div class="font-semibold">{{ user.firstName }} {{ user.lastName }}</div>
                        <div class="text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="getRoleClass(user.role)" class="px-3 py-1 text-xs font-semibold rounded-full">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="getStatusClass(user.isActive)" class="px-3 py-1 text-xs font-semibold rounded-full">
                      {{ user.isActive ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4">{{ formatDate(user.createdAt) }}</td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center space-x-2">
                      <button @click="viewProfile(user)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Voir
                      </button>
                      <button @click="editUser(user)" class="text-green-600 hover:text-green-800 text-sm font-medium">
                        Modifier
                      </button>
                      <!-- Masquer les options pour les admins -->
                      <button 
                        v-if="user.role !== 'admin'" 
                        @click="toggleUserStatus(user)" 
                        class="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        {{ user.isActive ? 'Désactiver' : 'Activer' }}
                      </button>
                      <button 
                        v-if="user.role !== 'admin'" 
                        @click="deleteUser(user)" 
                        class="text-red-600 hover:text-red-800 text-sm font-medium">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Empty state -->
                <tr v-if="!filteredUsers.length && !loading">
                  <td colspan="5" class="text-center py-10 text-gray-500">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { userService } from '../../config/api.js'
  import { notificationService } from '../../config/notification.js'

  export default {
    name: 'User',
    data() {
      return {
        searchQuery: '',
        users: [],
        loading: false,
        error: null
      };
    },
    computed: {
      /**
       * Filters the users based on the search query.
       * @returns {Array} The filtered list of users.
       */
      filteredUsers() {
        if (!this.searchQuery) {
          return this.users;
        }
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.users.filter(user =>
          user.firstName.toLowerCase().includes(lowerCaseQuery) ||
          user.lastName.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
        );
      }
    },
    async mounted() {
      await this.loadUsers();
    },
    methods: {
      /**
       * Charge la liste des utilisateurs depuis l'API
       */
      async loadUsers() {
        this.loading = true;
        this.error = null;
        
        try {
          const response = await userService.getAllUsers();
          this.users = response.data.data || [];
          /* notificationService.success('Liste des utilisateurs chargée avec succès'); */
        } catch (error) {
          console.error('Erreur lors du chargement des utilisateurs:', error);
          this.error = error.response?.data?.message || 'Erreur lors du chargement des utilisateurs';
          notificationService.error(this.error);
        } finally {
          this.loading = false;
        }
      },

      /**
       * Génère les initiales d'un utilisateur
       */
      getUserInitials(firstName, lastName) {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
      },

      /**
       * Returns the appropriate CSS class for the user role.
       * @param {string} role - The role of the user.
       * @returns {string} - The Tailwind CSS classes.
       */
      getRoleClass(role) {
        const roleMap = {
          'admin': 'bg-purple-100 text-purple-800',
          'user': 'bg-blue-100 text-blue-800',
          'moderator': 'bg-green-100 text-green-800',
        };
        return roleMap[role] || 'bg-gray-100 text-gray-800';
      },

      /**
       * Returns the appropriate CSS class for the user status.
       * @param {boolean} isActive - The status of the user.
       * @returns {string} - The Tailwind CSS classes.
       */
      getStatusClass(isActive) {
        return isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-200 text-gray-800';
      },

      /**
       * Formats a date string to a more readable format (DD/MM/YYYY).
       * @param {string} dateString - The date string to format.
       * @returns {string} - The formatted date.
       */
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      },

      /**
       * Navigate to user profile view
       * @param {object} user - The user object.
       */
      viewProfile(user) {
        console.log('Viewing profile for user:', user.id);
        notificationService.info(`Affichage du profil de ${user.firstName} ${user.lastName}`);
        // TODO: Navigate to user detail page
      },

      /**
       * Navigate to edit user page
       * @param {object} user - The user object.
       */
      editUser(user) {
        console.log('Editing user:', user.id);
        notificationService.info(`Modification de l'utilisateur ${user.firstName} ${user.lastName}`);
        // TODO: Navigate to edit user page
      },

      /**
       * Toggle user active status
       * @param {object} user - The user object.
       */
      async toggleUserStatus(user) {
        try {
          await userService.toggleUserStatus(user.id);
          // Reload users to get updated data
          await this.loadUsers();
          
          const action = user.isActive ? 'désactivé' : 'activé';
          notificationService.success(
            `Utilisateur ${user.firstName} ${user.lastName} ${action} avec succès`,
            'Statut modifié'
          );
        } catch (error) {
          console.error('Erreur lors du changement de statut:', error);
          const errorMessage = error.response?.data?.message || 'Erreur lors du changement de statut';
          notificationService.error(errorMessage, 'Erreur de modification');
        }
      },

      /**
       * Delete user
       * @param {object} user - The user object.
       */
      async deleteUser(user) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.firstName} ${user.lastName} ?`)) {
          try {
            await userService.deleteUser(user.id);
            // Reload users to get updated data
            await this.loadUsers();
            
            notificationService.success(
              `Utilisateur ${user.firstName} ${user.lastName} supprimé avec succès`,
              'Utilisateur supprimé'
            );
          } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression';
            notificationService.error(errorMessage, 'Erreur de suppression');
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles can be added here if needed. */
  </style>
  