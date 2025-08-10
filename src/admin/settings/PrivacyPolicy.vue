<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Politique de Confidentialité</h1>
        <p class="text-sm text-gray-500 mt-1">Consultez notre politique sur la gestion des données.</p>
      </div>

      <!-- Content Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">Gestion des données personnelles</h2>
        
        <div class="prose prose-gray max-w-none">
          <h3 class="text-lg font-medium text-gray-800 mb-4">Collecte des données</h3>
          <p class="text-gray-600 mb-4">
            Nous collectons les informations que vous nous fournissez directement, telles que votre nom, 
            adresse e-mail, adresse postale et numéro de téléphone lorsque vous créez un compte, 
            passez une commande ou nous contactez.
          </p>

          <h3 class="text-lg font-medium text-gray-800 mb-4">Utilisation des données</h3>
          <p class="text-gray-600 mb-4">
            Nous utilisons vos informations pour traiter vos commandes, vous fournir un service client, 
            vous envoyer des communications marketing (avec votre consentement) et améliorer nos services.
          </p>

          <h3 class="text-lg font-medium text-gray-800 mb-4">Protection des données</h3>
          <p class="text-gray-600 mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations 
            personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
          </p>

          <h3 class="text-lg font-medium text-gray-800 mb-4">Vos droits</h3>
          <p class="text-gray-600 mb-4">
            Vous avez le droit d'accéder, de corriger, de supprimer et de limiter le traitement de vos 
            données personnelles. Vous pouvez également retirer votre consentement à tout moment.
          </p>

          <h3 class="text-lg font-medium text-gray-800 mb-4">Contact</h3>
          <p class="text-gray-600">
            Pour toute question concernant cette politique de confidentialité, 
            contactez-nous à privacy@example.com
          </p>
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
  name: 'PrivacyPolicy'
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>

