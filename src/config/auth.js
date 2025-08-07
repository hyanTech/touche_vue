// Service d'authentification
import apiClient from './api.js'

// Clés pour le stockage local
const AUTH_TOKEN_KEY = 'authToken'
const USER_INFO_KEY = 'userInfo'

// Fonction pour décoder un JWT (sans vérification de signature)
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Erreur lors du décodage du JWT:', error)
    return null
  }
}

// Fonction pour vérifier l'expiration d'un token
function isTokenExpired(token) {
  try {
    const decoded = decodeJWT(token)
    if (!decoded || !decoded.exp) {
      return true // Considérer comme expiré si pas d'expiration
    }
    
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  } catch (error) {
    console.error('Erreur lors de la vérification d\'expiration:', error)
    return true // Considérer comme expiré en cas d'erreur
  }
}

// Service d'authentification
export const authService = {
  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const token = this.getToken()
    if (!token) {
      return false
    }
    
    // Vérifier l'expiration du token
    if (isTokenExpired(token)) {
      this.logout() // Nettoyer le token expiré
      return false
    }
    
    return true
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

  // Déconnexion
  logout() {
    this.removeToken()
    this.removeUserInfo()
  },

  // Vérifier la validité du token (vérification locale + optionnelle avec le serveur)
  async validateToken(forceServerCheck = false) {
    try {
      const token = this.getToken()
      if (!token) {
        return false
      }

      // Vérification locale de l'expiration
      if (isTokenExpired(token)) {
        console.log('Token expiré détecté localement')
        this.logout()
        return false
      }

      // Vérification optionnelle avec le serveur (pour les cas où on veut s'assurer que le token n'a pas été révoqué)
      if (forceServerCheck) {
        try {
          const response = await apiClient.get('/auth/validate')
          return response.status === 200
        } catch (error) {
          console.error('Erreur de validation du token avec le serveur:', error)
          if (error.response?.status === 401) {
            this.logout()
          }
          return false
        }
      }

      // Si pas de vérification serveur forcée, retourner true si le token n'est pas expiré
      return true
    } catch (error) {
      console.error('Erreur de validation du token:', error)
      return false
    }
  },

  // Obtenir le nom complet de l'utilisateur
  getUserFullName() {
    const userInfo = this.getUserInfo()
    if (userInfo && userInfo.firstName && userInfo.lastName) {
      return `${userInfo.firstName} ${userInfo.lastName}`
    }
    return userInfo?.email || 'Utilisateur Admin'
  },

  // Obtenir les informations du token décodé
  getTokenInfo() {
    const token = this.getToken()
    if (!token) {
      return null
    }
    
    const decoded = decodeJWT(token)
    if (!decoded) {
      return null
    }
    
    return {
      exp: decoded.exp,
      iat: decoded.iat,
      userId: decoded.userId || decoded.sub,
      email: decoded.email,
      role: decoded.role,
      isExpired: isTokenExpired(token),
      expiresIn: decoded.exp ? Math.max(0, decoded.exp - Math.floor(Date.now() / 1000)) : 0
    }
  },

  // Vérifier si le token expire bientôt (dans les 5 minutes)
  isTokenExpiringSoon() {
    const tokenInfo = this.getTokenInfo()
    if (!tokenInfo) {
      return false
    }
    
    // Avertir si le token expire dans les 5 minutes
    return tokenInfo.expiresIn < 300 // 5 minutes = 300 secondes
  }
}

// Fonction utilitaire pour vérifier l'authentification
export const requireAuth = async (to, from, next) => {
  const isAuth = authService.isAuthenticated()
  
  if (!isAuth) {
    // Rediriger vers la page de connexion si non authentifié
    next({ name: 'Login' })
    return
  }

  // Vérifier la validité du token (vérification locale uniquement)
  const isValid = await authService.validateToken(false) // false = pas de vérification serveur
  if (!isValid) {
    authService.logout()
    next({ name: 'Login' })
    return
  }

  // Passer les informations utilisateur à la route
  to.meta.userInfo = authService.getUserInfo()
  next()
}

export default authService 