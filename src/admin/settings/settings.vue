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
            <a v-for="item in settingsMenu" :key="item.id" :href="item.href" @click.prevent="navigate(item.id)" class="block p-5 hover:bg-gray-50 transition duration-150 ease-in-out">
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
            </a>
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
          {
            id: 'notifications',
            title: 'Notifications',
            description: 'Gérez vos alertes et préférences de communication.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />',
            iconBackground: 'bg-blue-500'
          },
          {
            id: 'newsletters',
            title: 'Newsletters',
            description: 'Abonnez-vous ou désabonnez-vous de nos lettres d\'information.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
            iconBackground: 'bg-green-500'
          },
          {
            id: 'site-info',
            title: 'Informations du Site',
            description: 'Modifiez les informations générales du site.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
            iconBackground: 'bg-indigo-500'
          },
          {
            id: 'social-media',
            title: 'Réseaux Sociaux',
            description: 'Connectez vos comptes de réseaux sociaux.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />',
            iconBackground: 'bg-pink-500'
          },
          {
            id: 'privacy-policy',
            title: 'Politique de Confidentialité',
            description: 'Consultez notre politique sur la gestion des données.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
            iconBackground: 'bg-red-500'
          },
          {
            id: 'legal-mentions',
            title: 'Mentions Légales',
            description: 'Informations légales concernant le site.',
            href: '#',
            iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
            iconBackground: 'bg-gray-500'
          },
        ]
      }
    },
    methods: {
      /**
       * Handles navigation to a settings page.
       * In a real Vue app, this would use Vue Router.
       * e.g., this.$router.push({ name: pageId })
       * @param {string} pageId - The ID of the page to navigate to.
       */
      navigate(pageId) {
        console.log(`Navigation vers la page : ${pageId}`);
        // In a real app, you would have routes configured.
        // For now, we just show an alert.
        alert(`Redirection vers la page "${pageId}"`);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Scoped styles can be added here if needed */
  </style>
  