<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Mon Profil</h1>
          <p class="text-sm text-gray-500 mt-1">Gérez vos informations personnelles et vos paramètres.</p>
        </div>
  
        <!-- Profile Information Card -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Informations Personnelles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Nom complet</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.name }}</p>
            </div>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Adresse e-mail</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.email }}</p>
            </div>
            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Numéro de téléphone</label>
              <p class="mt-1 text-lg text-gray-800">{{ user.phone }}</p>
            </div>
             <!-- Member Since -->
            <div>
              <label class="block text-sm font-medium text-gray-500">Membre depuis</label>
              <p class="mt-1 text-lg text-gray-800">{{ formatDate(user.memberSince) }}</p>
            </div>
          </div>
        </div>
  
        <!-- Address Card -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Adresse de Livraison</h2>
          <div v-if="user.address">
              <p class="text-lg text-gray-800">{{ user.address.street }}</p>
              <p class="text-lg text-gray-800">{{ user.address.city }}, {{ user.address.country }}</p>
          </div>
          <div v-else>
              <p class="text-gray-500">Aucune adresse enregistrée.</p>
          </div>
        </div>
  
        <!-- Actions Card -->
        <div class="bg-white rounded-xl shadow-md p-6">
           <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-4">Actions</h2>
           <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
               <button class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Modifier le profil
               </button>
               <button class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Changer le mot de passe
               </button>
           </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profil',
    data() {
      return {
        // Sample user data. In a real application, this would come from your authentication state.
        user: {
          name: 'Koffi Agbessi',
          email: 'koffi.agbessi@example.com',
          phone: '+228 91 00 00 02',
          memberSince: '2023-01-15',
          address: {
              street: '45 Avenue du Général de Gaulle',
              city: 'Lomé',
              country: 'Togo'
          }
        }
      }
    },
    methods: {
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
    }
  }
  </script>
  
  <style scoped>
  /* Scoped styles can be added here if needed */
  </style>
  