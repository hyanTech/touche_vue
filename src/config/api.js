import axios from 'axios'

// Configuration de base de l'API
/* export const API_BASE_URL = 'https://api.touchedeseduction.com/api' */

export const API_BASE_URL = 'http://localhost:3000/api'

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Augmentation du timeout à 30 secondes
    headers: {
        'Content-Type': 'application/json',
    }
})

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
    (config) => {
        // Ajouter un token d'authentification si nécessaire
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Gestion des erreurs globales
        if (error.response?.status === 401) {
            // Redirection vers la page de connexion si non authentifié
            console.error('Non authentifié')
        }
        return Promise.reject(error)
    }
)

// Service pour les catégories
export const categoryService = {
    // Récupérer toutes les catégories
    getCategories: () => {
        return apiClient.get('/categories')
    },

    // Récupérer les catégories actives (limitées)
    getActiveCategories: () => {
        return apiClient.get('/categories/active')
    },

    // Récupérer toutes les catégories actives
    getAllActiveCategories: () => {
        return apiClient.get('/categories/all')
    },

    // Créer une nouvelle catégorie
    createCategory: (categoryData) => {
        return apiClient.post('/categories', categoryData)
    },

    // Récupérer une catégorie par ID
    getCategory: (id) => {
        return apiClient.get(`/categories/${id}`)
    },

    // Mettre à jour une catégorie
    updateCategory: (id, categoryData) => {
        return apiClient.put(`/categories/${id}`, categoryData)
    },

    // Supprimer une catégorie
    deleteCategory: (id) => {
        return apiClient.delete(`/categories/${id}`)
    }
}

// Service pour les produits
export const productService = {
    // Récupérer tous les produits
    getProducts: () => {
        return apiClient.get('/products')
    },

    // Récupérer les produits actifs
    getActiveProducts: () => {
        return apiClient.get('/products/active')
    },

    // Récupérer tous les produits actifs
    getAllActiveProducts: () => {
        return apiClient.get('/products/all-active')
    },

    // Récupérer les produits par catégorie
    getProductsByCategory: (categoryId) => {
        return apiClient.get(`/products/category/${categoryId}`)
    },

    // Créer un nouveau produit
    createProduct: (productData) => {
        // Pour les fichiers, utiliser FormData
        const formData = new FormData()
        
        // Ajouter les données du produit
        Object.keys(productData).forEach(key => {
            if (key !== 'image_cover' && key !== 'images') {
                if (Array.isArray(productData[key])) {
                    formData.append(key, JSON.stringify(productData[key]))
                } else {
                    formData.append(key, productData[key])
                }
            }
        })
        
        // Ajouter l'image de couverture
        if (productData.image_cover) {
            formData.append('image_cover', productData.image_cover)
        }
        
        // Ajouter les images multiples
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach(image => {
                formData.append('images', image)
            })
        }
        
        return apiClient.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // Récupérer un produit par ID
    getProduct: (id) => {
        return apiClient.get(`/products/${id}`)
    },

    // Mettre à jour un produit
    updateProduct: (id, productData) => {
        // Pour les fichiers, utiliser FormData
        const formData = new FormData()
        
        // Ajouter les données du produit
        Object.keys(productData).forEach(key => {
            if (key !== 'image_cover' && key !== 'images' && key !== 'existing_images') {
                if (Array.isArray(productData[key])) {
                    formData.append(key, JSON.stringify(productData[key]))
                } else {
                    formData.append(key, productData[key])
                }
            }
        })
        
        // Ajouter l'image de couverture
        if (productData.image_cover) {
            formData.append('image_cover', productData.image_cover)
        }
        
        // Ajouter les images multiples
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach(image => {
                formData.append('images', image)
            })
        }
        
        // Ajouter les images existantes (URLs)
        if (productData.existing_images && productData.existing_images.length > 0) {
            formData.append('existing_images', JSON.stringify(productData.existing_images))
        }
        
        return apiClient.put(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // Supprimer un produit
    deleteProduct: (id) => {
        return apiClient.delete(`/products/${id}`)
    },

    // Supprimer une image de produit
    deleteProductImage: (productId, imageIndex) => {
        return apiClient.delete(`/products/${productId}/images/${imageIndex}`)
    },

    // Rechercher des produits
    searchProducts: (query) => {
        return apiClient.get('/products/search', {
            params: { 
                query: query,
                _t: Date.now() // Timestamp unique pour éviter le cache
            }
        })
    }
}

// Service pour les livraisons
export const deliveryService = {
    // Récupérer toutes les méthodes de livraison
    getDeliveries: () => {
        return apiClient.get('/deliveries')
    },

    // Récupérer les méthodes de livraison actives
    getActiveDeliveries: () => {
        return apiClient.get('/deliveries/active')
    },

    // Créer une nouvelle méthode de livraison
    createDelivery: (deliveryData) => {
        return apiClient.post('/deliveries', deliveryData)
    },

    // Récupérer une méthode de livraison par ID
    getDelivery: (id) => {
        return apiClient.get(`/deliveries/${id}`)
    },

    // Mettre à jour une méthode de livraison
    updateDelivery: (id, deliveryData) => {
        return apiClient.put(`/deliveries/${id}`, deliveryData)
    },

    // Supprimer une méthode de livraison
    deleteDelivery: (id) => {
        return apiClient.delete(`/deliveries/${id}`)
    }
}

// Service pour les commandes
export const orderService = {
    // Tester une commande (endpoint de test)
    testOrder: (orderData) => {
        return apiClient.post('/orders/test', orderData)
    },

    // Valider un paiement en ligne
    validateOnlinePayment: (orderId, paymentData) => {
        return apiClient.post('/payments', {
            orderId: orderId,
            operateur: paymentData.operateur,
            numero: paymentData.numero,
            montant: paymentData.montant
        })
    },

    // Créer une nouvelle commande
    createOrder: (orderData) => {
        return apiClient.post('/orders', orderData)
    },

    // Récupérer toutes les commandes
    getOrders: () => {
        return apiClient.get('/orders')
    },

    // Récupérer une commande par ID
    getOrder: (id) => {
        return apiClient.get(`/orders/${id}`)
    },

    // Mettre à jour une commande
    updateOrder: (id, orderData) => {
        return apiClient.put(`/orders/${id}`, orderData)
    },

    // Mettre à jour le statut d'une commande
    updateOrderStatus: (numeroCommande, etat) => {
        return apiClient.put('/orders/status', {
            numero_commande: numeroCommande,
            etat: etat
        })
    },

    // Supprimer une commande
    deleteOrder: (id) => {
        return apiClient.delete(`/orders/${id}`)
    },

    // Envoyer un email de confirmation de commande
    sendOrderEmail: (orderId) => {
        return apiClient.post(`/orders/${orderId}/send-email`)
    }
}

// Service pour les paiements
export const paymentService = {
    // Récupérer tous les paiements
    getAllPayments: (params = {}) => {
        return apiClient.get('/payments', { params })
    },

    // Récupérer un paiement par ID
    getPayment: (id) => {
        return apiClient.get(`/payments/${id}`)
    },

    // Créer un nouveau paiement
    createPayment: (paymentData) => {
        return apiClient.post('/payments', paymentData)
    },

    // Mettre à jour un paiement
    updatePayment: (id, paymentData) => {
        return apiClient.put(`/payments/${id}`, paymentData)
    },

    // Supprimer un paiement
    deletePayment: (id) => {
        return apiClient.delete(`/payments/${id}`)
    }
}

// Service pour les utilisateurs
export const userService = {
    // Récupérer tous les utilisateurs (admin seulement)
    getAllUsers: () => {
        return apiClient.get('/users')
    },

    // Récupérer un utilisateur par ID
    getUser: (id) => {
        return apiClient.get(`/users/${id}`)
    },

    // Créer un nouvel utilisateur
    createUser: (userData) => {
        return apiClient.post('/users', userData)
    },

    // Mettre à jour un utilisateur
    updateUser: (id, userData) => {
        return apiClient.put(`/users/${id}`, userData)
    },

    // Supprimer un utilisateur
    deleteUser: (id) => {
        return apiClient.delete(`/users/${id}`)
    },

    // Activer/Désactiver un utilisateur
    toggleUserStatus: (id) => {
        return apiClient.patch(`/users/${id}/toggle-status`)
    },

    // Changer le rôle d'un utilisateur
    changeUserRole: (id, role) => {
        return apiClient.patch(`/users/${id}/role`, { role })
    },

    // Récupérer le profil de l'utilisateur connecté
    getCurrentUser: () => {
        // Récupérer l'ID de l'utilisateur depuis les informations stockées
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        const userId = userInfo.id
        
        if (!userId) {
            return Promise.reject(new Error('ID utilisateur non trouvé'))
        }
        
        return apiClient.get(`/users/${userId}`)
    },

    // Mettre à jour le profil de l'utilisateur connecté
    updateCurrentUser: (userData) => {
        // Récupérer l'ID de l'utilisateur depuis les informations stockées
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
        const userId = userInfo.id
        
        if (!userId) {
            return Promise.reject(new Error('ID utilisateur non trouvé'))
        }
        
        return apiClient.put(`/users/${userId}`, userData)
    }
}

// Service pour les publicités
export const headerService = {
  // Récupérer toutes les publicités
  getAllHeaders: () => {
    return apiClient.get('/headers')
  },
  // Récupérer une publicité par ID
  getHeader: (id) => {
    return apiClient.get(`/headers/${id}`)
  },
  // Créer une nouvelle publicité
  createHeader: (pubData) => {
    // Vérifier si pubData est un FormData (avec des fichiers)
    if (pubData instanceof FormData) {
      return apiClient.post('/headers', pubData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    // Sinon, envoyer comme JSON normal
    return apiClient.post('/headers', pubData)
  },
  // Mettre à jour une publicité
  updateHeader: (id, pubData) => {
    // Vérifier si pubData est un FormData (avec des fichiers)
    if (pubData instanceof FormData) {
      return apiClient.put(`/headers/${id}`, pubData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    // Sinon, envoyer comme JSON normal
    return apiClient.put(`/headers/${id}`, pubData)
  },
  // Supprimer une publicité
  deleteHeader: (id) => {
    return apiClient.delete(`/headers/${id}`)
  }
}

// Service pour les contacts
export const contactService = {
  // Récupérer tous les contacts
  getAllContacts: () => {
    return apiClient.get('/contacts')
  },

  // Récupérer un contact par ID
  getContact: (id) => {
    return apiClient.get(`/contacts/${id}`)
  },

  // Créer un nouveau contact
  createContact: (contactData) => {
    return apiClient.post('/contacts', contactData)
  },

  // Mettre à jour un contact
  updateContact: (id, contactData) => {
    return apiClient.put(`/contacts/${id}`, contactData)
  },

  // Supprimer un contact
  deleteContact: (id) => {
    return apiClient.delete(`/contacts/${id}`)
  }
}

// Service pour les informations du site
export const informationService = {
  // Récupérer toutes les informations
  getAllInformations: () => {
    return apiClient.get('/informations')
  },

  // Récupérer une information par ID
  getInformation: (id) => {
    return apiClient.get(`/informations/${id}`)
  },

  // Créer une nouvelle information
  createInformation: (informationData) => {
    return apiClient.post('/informations', informationData)
  },

  // Mettre à jour une information
  updateInformation: (id, informationData) => {
    return apiClient.put(`/informations/${id}`, informationData)
  },

  // Supprimer une information
  deleteInformation: (id) => {
    return apiClient.delete(`/informations/${id}`)
  }
}

export default apiClient 