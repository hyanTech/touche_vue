import axios from 'axios'

// Configuration de base de l'API
export const API_BASE_URL = 'https://toucheapi-production.up.railway.app/api'

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

export default apiClient 