<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="max-w-4xl mx-auto">
        <!-- Settings Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Paramètres</h1>
          <p class="text-sm text-gray-500 mt-1">Sélectionnez une catégorie pour gérer vos paramètres.</p>
        </div>
  
        <!-- Settings Navigation List -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="divide-y divide-gray-200">
            <!-- Loop through settings options -->
            <div v-for="item in settingsMenu" :key="item.id" class="block p-5 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer" @click="navigate(item)">
              <div class="flex items-center">
                <!-- Icon -->
                <div class="flex-shrink-0">
                  <div class="h-12 w-12 rounded-lg flex items-center justify-center" :class="item.iconBackground">
                     <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.iconPath"></svg>
                  </div>
                </div>
                <!-- Title and Description -->
                <div class="ml-4 flex-grow">
                  <p class="text-lg font-medium text-gray-800">{{ item.title }}</p>
                  <p class="text-sm text-gray-500">{{ item.description }}</p>
                </div>
                <!-- Chevron Icon -->
                <div class="ml-4 flex-shrink-0">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Settings',
    data() {
      return {
        // Menu items for the settings page
        settingsMenu: [
          /* {
            id: 'notifications',
            title: 'Notifications',
            description: 'Gérez vos alertes et préférences de communication.',
            route: { name: 'Notifications' },
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />',
            iconBackground: 'bg-blue-500'
          },
          {
            id: 'newsletters',
            title: 'Newsletters',
            description: 'Abonnez-vous ou désabonnez-vous de nos lettres d\'information.',
            route: { name: 'Newsletters' },
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
            iconBackground: 'bg-green-500'
          }, */
          {
            id: 'site-info',
            title: 'Informations du Site',
            description: 'Modifiez les informations générales du site.',
            route: { name: 'SiteInfo' },
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
            iconBackground: 'bg-indigo-500'
          },
          {
            id: 'contact',
            title: 'Contact',
            description: 'Modifiez les informations de contact du site.',
            route: { name: 'Contact_Admin' },
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />',
            iconBackground: 'bg-yellow-500'
          },
          
          {
            id: 'pub',
            title: 'Pub',
            description: 'Publiez vos annonces.',
            route: { name: 'Pub' },
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />',
            iconBackground: 'bg-yellow-500'
          }
        ]
      }
    },
    methods: {
      /**
       * Handles navigation to a settings page using Vue Router.
       * @param {object} item - The menu item to navigate to.
       */
      navigate(item) {
        console.log(`Navigation vers la page : ${item.id}`);
        
        try {
          // Essayer de naviguer vers la route spécifiée
          this.$router.push(item.route);
        } catch (error) {
          console.warn(`Route "${item.route.name}" non trouvée, création d'une page temporaire`);
          
          // Si la route n'existe pas, créer une page temporaire
          this.$router.push({
            name: 'Settings',
            query: { 
              page: item.id,
              title: item.title 
            }
          });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Scoped styles can be added here if needed */
  </style>
  