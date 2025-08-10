<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Mentions Légales</h1>
        <p class="text-sm text-gray-500 mt-1">Informations légales concernant le site.</p>
      </div>

      <!-- Content Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Informations légales</h2>
        
        <div class="prose prose-gray max-w-none space-y-6">
          <!-- Éditeur -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Éditeur du site</h3>
            <p class="text-gray-600">
              <strong>Touche de Séduction</strong><br>
              Adresse : [Votre adresse]<br>
              Téléphone : [Votre téléphone]<br>
              Email : contact@touchedeseduction.com
            </p>
          </div>

          <!-- Directeur de publication -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Directeur de publication</h3>
            <p class="text-gray-600">
              [Nom du directeur de publication]<br>
              [Fonction]
            </p>
          </div>

          <!-- Hébergement -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Hébergement</h3>
            <p class="text-gray-600">
              Ce site est hébergé par [Nom de l'hébergeur]<br>
              Adresse : [Adresse de l'hébergeur]<br>
              Téléphone : [Téléphone de l'hébergeur]
            </p>
          </div>

          <!-- Propriété intellectuelle -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Propriété intellectuelle</h3>
            <p class="text-gray-600">
              L'ensemble de ce site relève de la législation française et internationale 
              sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>
          </div>

          <!-- Responsabilité -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Responsabilité</h3>
            <p class="text-gray-600">
              Les informations contenues sur ce site sont aussi précises que possible 
              et le site est périodiquement remis à jour, mais peut toutefois contenir 
              des inexactitudes, des omissions ou des lacunes.
            </p>
          </div>

          <!-- Liens hypertextes -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Liens hypertextes</h3>
            <p class="text-gray-600">
              Les liens hypertextes mis en place dans le cadre du présent site web 
              en direction d'autres ressources présentes sur le réseau Internet ne 
              sauraient engager la responsabilité de l'éditeur.
            </p>
          </div>
        </div>

        <!-- Last Updated -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalMentions'
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>

