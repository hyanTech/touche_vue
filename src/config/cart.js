import { ref, computed } from 'vue';
import { formatPrice } from './utils.js';

// Store réactif pour le panier
const cartItems = ref([]);

// Fonctions du panier
export const useCart = () => {
  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    // Créer un identifiant unique pour le produit avec ses variantes
    const variantKey = `${product.id}-${product.selectedColor || 'default'}-${product.selectedSize || 'default'}`;
    
    // Vérifier si le produit avec cette variante est déjà dans le panier
    const existingItemIndex = cartItems.value.findIndex(item => {
      const itemVariantKey = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
      return itemVariantKey === variantKey;
    });
    
    if (existingItemIndex !== -1) {
      // Produit avec cette variante déjà dans le panier, vérifier le stock
      const existingItem = cartItems.value[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      
      if (newQuantity <= product.stock) {
        // Mettre à jour la quantité
        cartItems.value[existingItemIndex].quantity = newQuantity;
        cartItems.value[existingItemIndex].price = product.prix_promotion || product.prix;
        cartItems.value[existingItemIndex].image = product.image_cover;
        cartItems.value[existingItemIndex].stock = product.stock;
      } else {
        // Quantité dépasse le stock disponible
        throw new Error(`Impossible d'ajouter ${quantity} article(s). Stock disponible: ${product.stock - existingItem.quantity}`);
      }
    } else {
      // Nouveau produit ou nouvelle variante, vérifier le stock
      if (quantity <= product.stock) {
        cartItems.value.push({
          id: product.id,
          name: product.nom,
          price: product.prix_promotion || product.prix,
          image: product.image_cover,
          quantity: quantity,
          stock: product.stock,
          description: product.description,
          selectedColor: product.selectedColor,
          selectedSize: product.selectedSize
        });
      } else {
        throw new Error(`Impossible d'ajouter ${quantity} article(s). Stock disponible: ${product.stock}`);
      }
    }
    
    // Sauvegarder dans localStorage
    saveCartToStorage();
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId, selectedColor = null, selectedSize = null) => {
    const variantKey = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    const index = cartItems.value.findIndex(item => {
      const itemVariantKey = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
      return itemVariantKey === variantKey;
    });
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      saveCartToStorage();
    }
  };

  // Modifier la quantité d'un produit
  const updateQuantity = (productId, newQuantity, selectedColor = null, selectedSize = null) => {
    const variantKey = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    const item = cartItems.value.find(item => {
      const itemVariantKey = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
      return itemVariantKey === variantKey;
    });
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(productId, selectedColor, selectedSize);
      } else if (newQuantity <= item.stock) {
        item.quantity = newQuantity;
        saveCartToStorage();
      } else {
        throw new Error(`Quantité maximale autorisée: ${item.stock}`);
      }
    }
  };

  // Incrémenter la quantité
  const incrementQuantity = (productId, selectedColor = null, selectedSize = null) => {
    const variantKey = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    const item = cartItems.value.find(item => {
      const itemVariantKey = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
      return itemVariantKey === variantKey;
    });
    if (item && item.quantity < item.stock) {
      updateQuantity(productId, item.quantity + 1, selectedColor, selectedSize);
    }
  };

  // Décrémenter la quantité
  const decrementQuantity = (productId, selectedColor = null, selectedSize = null) => {
    const variantKey = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    const item = cartItems.value.find(item => {
      const itemVariantKey = `${item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
      return itemVariantKey === variantKey;
    });
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1, selectedColor, selectedSize);
    }
  };

  // Vider le panier
  const clearCart = () => {
    cartItems.value = [];
    saveCartToStorage();
  };

  // Sauvegarder le panier dans localStorage
  const saveCartToStorage = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems.value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  };

  // Charger le panier depuis localStorage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      cartItems.value = [];
    }
  };

  // Calculer le total du panier
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  // Formater le total pour l'affichage
  const formattedCartTotal = computed(() => {
    return formatPrice(cartTotal.value);
  });

  // Nombre total d'articles dans le panier
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  // Vérifier si le panier est vide
  const isCartEmpty = computed(() => {
    return cartItems.value.length === 0;
  });

  return {
    // État réactif
    cartItems,
    
    // Fonctions
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    loadCartFromStorage,
    
    // Computed
    cartTotal,
    formattedCartTotal,
    cartItemCount,
    isCartEmpty
  };
};

// Charger le panier au démarrage
const { loadCartFromStorage } = useCart();
loadCartFromStorage(); 