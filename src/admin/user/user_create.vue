<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <!-- Main Card -->
      <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden">
        
        <!-- Colonne de gauche (Branding & Info) -->
        <div class="w-full lg:w-5/12 p-8 md:p-12 flex flex-col justify-center items-center text-center lg:border-r lg:border-gray-200">
          <div class="mb-8">
            <i class="fas fa-user-plus fa-3x text-indigo-600"></i>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Bienvenue</h1>
          <p class="text-gray-600 text-lg">Créez un compte en quelques secondes pour débloquer toutes nos fonctionnalités.</p>
        </div>
  
        <!-- Colonne de droite (Formulaire) -->
        <div class="w-full lg:w-7/12 p-8 md:p-12">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ajouter un utilisateur</h2>
          <p class="text-gray-600 mb-8">Remplissez les champs pour continuer.</p>
          
          <form class="space-y-6" @submit.prevent="createUser">
            <!-- Champ Nom complet -->
            <div>
              <label for="fullname" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user text-gray-400"></i>
                </div>
                <input v-model="user.fullname" id="fullname" name="fullname" type="text" required class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="John Doe">
              </div>
            </div>
  
            <!-- Champ Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="exemple@domaine.com">
              </div>
            </div>
  
            <!-- Champ Mot de passe -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input v-model="user.password" id="password" name="password" type="password" autocomplete="new-password" required class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="••••••••">
              </div>
            </div>
            
            <!-- Champ Rôle -->
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-user-tag text-gray-400"></i>
                </div>
                <select v-model="user.role" id="role" name="role" class="w-full appearance-none pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                  <option>Utilisateur</option>
                  <option>Administrateur</option>
                  <option>Éditeur</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i class="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>
  
            <!-- Bouton de soumission -->
            <div>
              <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserCreate',
    data() {
      return {
        user: {
          fullname: '',
          email: '',
          password: '',
          role: 'Utilisateur' // Valeur par défaut
        }
      }
    },
    methods: {
      createUser() {
        // Ici, vous mettriez votre logique pour envoyer les données à une API
        console.log('Données de l\'utilisateur à créer :', this.user);
        // Vous pourriez ensuite réinitialiser le formulaire ou naviguer vers une autre page
        // alert(`Utilisateur ${this.user.fullname} créé !`);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Pour que ce composant fonctionne, assurez-vous que Tailwind CSS et Font Awesome 
     sont inclus dans votre projet Vue.js global, généralement dans votre 
     fichier main.js ou index.html. */
  </style>
  