<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Notifications</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez vos alertes et préférences de communication.</p>
      </div>

      <!-- Content Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Préférences de notifications</h2>
        
        <div class="space-y-6">
          <!-- Email Notifications -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Notifications par email</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Nouvelles commandes</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Mises à jour de produits</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Promotions et offres</span>
              </label>
            </div>
          </div>

          <!-- Push Notifications -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Notifications push</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Activer les notifications push</span>
              </label>
            </div>
          </div>

          <!-- Save Button -->
          <div class="pt-6 border-t border-gray-200">
            <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sauvegarder les préférences
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications'
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>

