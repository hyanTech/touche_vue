<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
        
        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ errorMessage }}
        </div>

        <!-- Message de succès -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input 
              type="email" 
              id="email" 
              v-model="email"
              required
              :disabled="isLoading"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="ex: utilisateur@mail.com"
            />
          </div>
  
          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              required
              :disabled="isLoading"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="••••••••"
            />
          </div>
  
          <!-- Bouton de connexion -->
          <div>
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Connexion en cours...</span>
              <span v-else>Se connecter</span>
            </button>
          </div>
        </form>
  
        <!-- Lien mot de passe oublié -->
        <p class="mt-4 text-sm text-center text-gray-600">
          Mot de passe oublié ? 
          <a href="#" class="text-blue-500 hover:underline">Réinitialiser</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { authService } from '../../config/auth.js'
  import { useRouter } from 'vue-router'

  export default {
    name: 'Login',
    setup() {
      const router = useRouter()
      return { router }
    },
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        errorMessage: '',
        successMessage: ''
      }
    },
    methods: {
      async handleLogin() {
        this.isLoading = true
        this.errorMessage = ''
        this.successMessage = ''

        try {
          const result = await authService.login(this.email, this.password)
          
          if (result.success) {
            this.successMessage = 'Connexion réussie ! Redirection...'
            
            // Redirection vers le dashboard admin après 1 seconde
            setTimeout(() => {
              this.router.push('/admin/dash')
            }, 1000)
          } else {
            this.errorMessage = result.error || 'Erreur de connexion'
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error)
          this.errorMessage = 'Erreur de connexion. Veuillez réessayer.'
        } finally {
          this.isLoading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Aucun style CSS supplémentaire nécessaire grâce à Tailwind */
  </style>
  