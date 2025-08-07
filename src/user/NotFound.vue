<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <!-- Icône 404 -->
          <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <i class="fas fa-exclamation-triangle text-red-600 text-4xl"></i>
          </div>
          
          <!-- Titre -->
          <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
          
          <!-- Message -->
          <p class="text-gray-500 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <!-- Boutons d'action -->
          <div class="space-y-4">
            <router-link to="/" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <i class="fas fa-home mr-2"></i>
              Retour à l'accueil
            </router-link>
            
            <button @click="goBack" 
              class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <i class="fas fa-arrow-left mr-2"></i>
              Page précédente
            </button>
          </div>
          
          <!-- Liens utiles -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-4">Liens utiles :</h3>
            <div class="grid grid-cols-2 gap-4">
              <router-link to="/produits" 
                class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                <i class="fas fa-shopping-bag mr-1"></i>
                Nos produits
              </router-link>
              <router-link to="/categories" 
                class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                <i class="fas fa-tags mr-1"></i>
                Catégories
              </router-link>
              <router-link to="/contact" 
                class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                <i class="fas fa-phone mr-1"></i>
                Contact
              </router-link>
              <router-link to="/info" 
                class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                <i class="fas fa-info-circle mr-1"></i>
                À propos
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
/* Les styles sont gérés par TailwindCSS */
</style> 