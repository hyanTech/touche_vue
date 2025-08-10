// Service d'authentification
import apiClient from './api.js'

// Clés pour le stockage local
const AUTH_TOKEN_KEY = 'authToken'
const USER_INFO_KEY = 'userInfo'

// Service d'authentification
export const authService = {
  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    const token = this.getToken()
    if (!token) {
      return false
    }
    
    // Vérifier la validité du token avec le serveur
    try {
      const isValid = await this.verifyToken()
      if (!isValid) {
        this.logout() // Nettoyer le token invalide
        return false
      }
      
      return true
    } catch (error) {
      console.error('Erreur lors de la vérification d\'authentification:', error)
      this.logout()
      return false
    }
  },

  // Obtenir le token depuis localStorage
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  // Sauvegarder le token
  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  // Supprimer le token
  removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },

  // Obtenir les informations utilisateur
  getUserInfo() {
    const userInfo = localStorage.getItem(USER_INFO_KEY)
    return userInfo ? JSON.parse(userInfo) : null
  },

  // Sauvegarder les informations utilisateur
  setUserInfo(userInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
  },

  // Supprimer les informations utilisateur
  removeUserInfo() {
    localStorage.removeItem(USER_INFO_KEY)
  },

  // Vérifier le token avec le serveur
  async verifyToken() {
    try {
      const token = this.getToken()
      if (!token) {
        return false
      }

      const response = await apiClient.get('/auth/verify')
      
      // Si on reçoit un statut 200, le token est valide
      if (response.status === 200 && response.data.success) {
        // Mettre à jour les informations utilisateur avec les données reçues
        if (response.data.data) {
          this.setUserInfo(response.data.data)
        }
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error)
      
      // Gérer les différents codes d'erreur
      if (error.response?.status === 401) {
        // Token invalide ou expiré
        console.log('Token invalide (401)')
        this.logout()
        return false
      } else if (error.response?.status === 404) {
        // Route non trouvée
        console.log('Route de vérification non trouvée (404)')
        return false
      } else {
        // Autres erreurs (500, etc.)
        console.log('Erreur serveur lors de la vérification du token')
        return false
      }
    }
  },

  // Connexion - adapté à votre API
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })

      // Vérifier la structure de réponse de votre API
      if (response.data.success && response.data.data.token) {
        this.setToken(response.data.data.token)
        this.setUserInfo(response.data.data.user)
        return { 
          success: true, 
          message: response.data.message,
          data: response.data.data 
        }
      } else {
        return { 
          success: false, 
          error: 'Réponse invalide du serveur' 
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      
      // Gestion des erreurs de validation
      if (error.response?.status === 400 && error.response?.data?.errors) {
        const validationErrors = error.response.data.errors
        const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ')
        return { 
          success: false, 
          error: errorMessage 
        }
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de connexion' 
      }
    }
  },

  // Changer le mot de passe
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      })

      if (response.data.success) {
        return { 
          success: true, 
          message: response.data.message 
        }
      } else {
        return { 
          success: false, 
          error: response.data.message || 'Erreur lors du changement de mot de passe' 
        }
      }
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error)
      
      // Gestion des erreurs de validation
      if (error.response?.status === 400 && error.response?.data?.errors) {
        const validationErrors = error.response.data.errors
        const errorMessage = validationErrors.map(err => `${err.field}: ${err.message}`).join(', ')
        return { 
          success: false, 
          error: errorMessage 
        }
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors du changement de mot de passe' 
      }
    }
  },

  // Déconnexion
  logout() {
    this.removeToken()
    this.removeUserInfo()
  },

  // Vérifier la validité du token (toujours avec le serveur)
  async validateToken() {
    return await this.verifyToken()
  },

  // Obtenir le nom complet de l'utilisateur
  getUserFullName() {
    const userInfo = this.getUserInfo()
    if (userInfo && userInfo.firstName && userInfo.lastName) {
      return `${userInfo.firstName} ${userInfo.lastName}`
    }
    return userInfo?.email || 'Utilisateur Admin'
  },

  // Obtenir les informations du token (depuis les données utilisateur stockées)
  getTokenInfo() {
    const userInfo = this.getUserInfo()
    if (!userInfo) {
      return null
    }
    
    return {
      userId: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName
    }
  }
}

// Fonction utilitaire pour vérifier l'authentification
export const requireAuth = async (to, from, next) => {
  try {
    const isAuth = await authService.isAuthenticated()
    
    if (!isAuth) {
      // Rediriger vers la page de connexion si non authentifié
      next({ name: 'Login' })
      return
    }

    // Passer les informations utilisateur à la route
    to.meta.userInfo = authService.getUserInfo()
    next()
  } catch (error) {
    console.error('Erreur lors de la vérification d\'authentification:', error)
    authService.logout()
    next({ name: 'Login' })
  }
}

export default authService 