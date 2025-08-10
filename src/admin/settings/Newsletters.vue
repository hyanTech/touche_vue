<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Newsletters</h1>
        <p class="text-sm text-gray-500 mt-1">Abonnez-vous ou désabonnez-vous de nos lettres d'information.</p>
      </div>

      <!-- Content Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Préférences de newsletters</h2>
        
        <div class="space-y-6">
          <!-- Newsletter Types -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Types de newsletters</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Nouvelles et actualités</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Promotions et offres spéciales</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Nouveaux produits</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-3 text-sm text-gray-700">Conseils et astuces</span>
              </label>
            </div>
          </div>

          <!-- Frequency -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Fréquence d'envoi</h3>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
              <option value="quarterly">Trimestriel</option>
            </select>
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
  name: 'Newsletters'
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>

