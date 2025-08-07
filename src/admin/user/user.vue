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
  
        <!-- User List Card -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <!-- User Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Utilisateur</th>
                  <th scope="col" class="px-6 py-3">Rôle</th>
                  <th scope="col" class="px-6 py-3">Statut</th>
                  <th scope="col" class="px-6 py-3">Inscrit le</th>
                  <th scope="col" class="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop through filtered users -->
                <tr v-for="user in filteredUsers" :key="user.id" class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div class="flex items-center">
                      <img class="h-10 w-10 rounded-full object-cover" :src="user.avatarUrl" :alt="user.name"
                           onerror="this.onerror=null;this.src='https://placehold.co/40x40/e2e8f0/7f8c9b?text=User';">
                      <div class="ml-4">
                        <div class="font-semibold">{{ user.name }}</div>
                        <div class="text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ user.role }}</td>
                  <td class="px-6 py-4">
                    <span :class="getStatusClass(user.status)" class="px-3 py-1 text-xs font-semibold rounded-full">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4">{{ formatDate(user.joinedDate) }}</td>
                  <td class="px-6 py-4 text-center">
                    <button @click="viewProfile(user)" class="font-medium text-blue-600 hover:underline">
                      Voir le profil
                    </button>
                  </td>
                </tr>
                <!-- Empty state -->
                <tr v-if="!filteredUsers.length">
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
  export default {
    name: 'User',
    data() {
      return {
        searchQuery: '',
        // Sample user data. In a real application, you would fetch this from an API.
        users: [
          {
            id: 1,
            name: 'Afi Ananou',
            email: 'afi.ananou@example.com',
            avatarUrl: 'https://placehold.co/100x100/a7b3c4/FFF?text=AA',
            role: 'Administrateur',
            status: 'Actif',
            joinedDate: '2023-05-12',
          },
          {
            id: 2,
            name: 'Koffi Agbessi',
            email: 'koffi.agbessi@example.com',
            avatarUrl: 'https://placehold.co/100x100/d1d5db/FFF?text=KA',
            role: 'Éditeur',
            status: 'Actif',
            joinedDate: '2023-08-21',
          },
          {
            id: 3,
            name: 'Ekué Mensah',
            email: 'ekue.mensah@example.com',
            avatarUrl: 'https://placehold.co/100x100/9ca3af/FFF?text=EM',
            role: 'Utilisateur',
            status: 'Inactif',
            joinedDate: '2024-01-05',
          },
          {
            id: 4,
            name: 'Fifi Lawson',
            email: 'fifi.lawson@example.com',
            avatarUrl: 'https://placehold.co/100x100/f87171/FFF?text=FL',
            role: 'Utilisateur',
            status: 'Actif',
            joinedDate: '2024-03-15',
          },
           {
            id: 5,
            name: 'Yao Sodji',
            email: 'yao.sodji@example.com',
            avatarUrl: 'https://placehold.co/100x100/34d399/FFF?text=YS',
            role: 'Utilisateur',
            status: 'En attente',
            joinedDate: '2024-07-30',
          },
        ],
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
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
        );
      }
    },
    methods: {
      /**
       * Returns the appropriate CSS class for the user status.
       * @param {string} status - The status of the user.
       * @returns {string} - The Tailwind CSS classes.
       */
      getStatusClass(status) {
        const statusMap = {
          'Actif': 'bg-green-100 text-green-800',
          'Inactif': 'bg-gray-200 text-gray-800',
          'En attente': 'bg-yellow-100 text-yellow-800',
          'Banni': 'bg-red-100 text-red-800',
        };
        return statusMap[status] || 'bg-gray-100 text-gray-800';
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
       * Placeholder function to navigate to a user's profile.
       * @param {object} user - The user object.
       */
      viewProfile(user) {
        console.log('Viewing profile for user:', user.id);
        alert(`Affichage du profil de ${user.name}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles can be added here if needed. */
  </style>
  