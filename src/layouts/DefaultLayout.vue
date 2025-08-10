<template>
  <div id="app" class="bg-gray-100" style="font-family: 'Inter', sans-serif;">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" xintegrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Page Loader -->
    <div v-if="isPageLoading" class="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div class="text-center">
        <img src="/src/assets/logo.png" alt="Logo" class="h-28 w-auto mx-auto mb-4 animate-pulse">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F8B259] mx-auto mb-4"></div>
        <p class="text-gray-600 font-medium">Chargement...</p>
      </div>
    </div>

    <!-- Page Transition Overlay -->
    <div v-if="isPageTransitioning" class="fixed inset-0 z-[9998] bg-[#F8B259] flex items-center justify-center">
      <div class="text-center text-white">
        <div class="animate-pulse">
          <img src="/src/assets/logo.png" alt="Logo" class="h-20 w-auto mx-auto mb-4">
          <h2 class="text-2xl font-bold mb-2">Touche de Séduction</h2>
          <p class="text-[#443627]">Changement de page...</p>
        </div>
      </div>
    </div>

    <!-- Sidebars (Menu & Panier) -->
    <div :class="['fixed inset-0 z-50 transition-opacity duration-300', isSidebarOpen || isCartOpen ? 'bg-[rgba(0,0,0,0.25)]' : 'pointer-events-none opacity-0']" @click="isSidebarOpen = false; isCartOpen = false;"></div>
    
    <!-- Sidebar Menu Mobile -->
    <aside :class="['fixed top-0 left-0 w-72 h-full bg-white shadow-xl z-50 p-6 transform transition-transform duration-300', isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center">
          <img src="/src/assets/logo.png" alt="Logo" class="h-28 w-auto">
        </div>
        <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-800 cursor-pointer"><i class="fas fa-times text-xl"></i></button>
      </div>
      <nav>
        <ul>
          <li v-for="(link, index) in dynamicMobileMenu" :key="link.name" class="border-b border-gray-200">
            <div v-if="!link.sublinks" class="block text-gray-700 hover:bg-[#F8B259] hover:text-[#F8B259] rounded-md p-3 transition-colors">
              <a :href="link.href" class="cursor-pointer flex items-center">
                <i v-if="link.icon" :class="link.icon" class="mr-3"></i>
                {{ link.name }}
              </a>
            </div>
            <div v-else>
              <button @click="toggleAccordion(index)" class="w-full flex justify-between items-center text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md p-3 transition-colors cursor-pointer">
                <span class="flex items-center">
                  <i v-if="link.icon" :class="link.icon" class="mr-3"></i>
                  {{ link.name }}
                </span>
                <i :class="['fas fa-chevron-down transition-transform', openAccordion === index ? 'rotate-180' : '']"></i>
              </button>
              <div v-if="openAccordion === index" class="pl-4 mt-2 mb-2">
                <a v-for="sublink in link.sublinks" :key="sublink.name" :href="sublink.href" class="block text-gray-600 p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center">
                  <i v-if="sublink.icon" :class="sublink.icon" class="mr-2 text-sm"></i>
                  {{ sublink.name }}
                </a>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Sidebar Panier -->
    <aside :class="['fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transform transition-transform duration-300', isCartOpen ? 'translate-x-0' : 'translate-x-full']">
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Votre Panier</h2>
          <button @click="toggleCart" class="text-gray-500 hover:text-gray-800 cursor-pointer"><i class="fas fa-times text-xl"></i></button>
        </div>
        <div class="flex-grow p-6 overflow-y-auto">
          <div v-if="isCartEmpty" class="text-center text-gray-500 mt-10">
            <i class="fas fa-shopping-cart text-4xl mb-4"></i>
            <p>Votre panier est vide.</p>
          </div>
          <div v-else v-for="item in cartItems" :key="item.id" class="flex items-center mb-4">
            <img :src="getImageUrl(item.image)" :alt="item.name" class="w-20 h-20 object-cover rounded-md mr-4" @error="handleImageError">
            <div class="flex-grow">
              <h3 class="font-semibold text-gray-800 text-sm">{{ item.name }}</h3>
              <p class="text-sm text-gray-500">{{ formatPrice(item.price) }} FCFA</p>
              <!-- Affichage des variantes si elles existent -->
              <div v-if="item.selectedColor || item.selectedSize" class="text-xs text-gray-600 mt-1">
                <span v-if="item.selectedColor" class="mr-2">
                  <span class="inline-block w-3 h-3 rounded-full mr-1" :class="getColorClass(item.selectedColor)"></span>
                  {{ item.selectedColor }}
                </span>
                <span v-if="item.selectedSize" class="mr-2">
                  Taille: {{ item.selectedSize }}
                </span>
              </div>
              <div class="flex items-center mt-2">
                <button @click="decrementQuantity(item.id, item.selectedColor, item.selectedSize)" 
                        :disabled="item.quantity <= 1"
                        class="w-6 h-6 bg-gray-200 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors">-</button>
                <span class="mx-3 text-sm font-medium">{{ item.quantity }}</span>
                <button @click="incrementQuantity(item.id, item.selectedColor, item.selectedSize)" 
                        :disabled="item.quantity >= item.stock"
                        class="w-6 h-6 bg-gray-200 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors">+</button>
              </div>
              <!-- <p class="text-xs text-gray-400 mt-1">{{ item.quantity }} sur {{ item.stock }} disponibles</p> -->
            </div>
            <button @click="removeFromCart(item.id, item.selectedColor, item.selectedSize)" class="text-red-500 hover:text-red-700 cursor-pointer ml-2"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="p-6 border-t bg-bg-secondary">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-text-primary">Sous-total</span>
            <span class="text-lg font-bold text-text-primary">{{ formattedCartTotal }} FCFA</span>
          </div>
          <button @click="validateCart" 
                  :disabled="isCartEmpty"
                  class="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-hover-color transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Valider le panier
          </button>
        </div>
      </div>
    </aside>

    <!-- Header -->
    <UserNavbar 
      :cart-items="cartItems"
      :cart-item-count="cartItemCount"
      @toggle-sidebar="toggleSidebar"
      @toggle-cart="toggleCart"
    />

    <!-- Main Content with Page Transition -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <transition name="page" mode="out-in">
        <div :key="route.path" class="page-content">
          <slot />
        </div>
      </transition>
    </main>

    <!-- Footer -->
    <UserFooter />

    <!-- Scroll to Top Button -->
    <ScrollToTop />

    <!-- Notification Container -->
    <UserNotificationContainer />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserNavbar from '../components/user/navbar.vue';
import UserFooter from '../components/user/footer.vue';
import ScrollToTop from '../components/user/ScrollToTop.vue';
import UserNotificationContainer from '../components/UserNotificationContainer.vue';
import { mobileMenu, fetchActiveCategories } from '../config/menu.js';
import { useCart } from '../config/cart.js';
import { useUserNotification } from '../config/userNotification.js';
import { getImageUrl, formatPrice, handleImageError } from '../config/utils.js';

// Fonction pour obtenir la classe CSS de couleur
const getColorClass = (color) => {
  const colorMap = {
    'Noir': 'bg-gray-800',
    'Blanc': 'bg-white border',
    'Bleu': 'bg-blue-500',
    'Rouge': 'bg-red-500',
    'Vert': 'bg-green-500',
    'Jaune': 'bg-yellow-500',
    'Rose': 'bg-pink-500',
    'Violet': 'bg-purple-500',
    'Orange': 'bg-orange-500',
    'Gris': 'bg-gray-500'
  };
  return colorMap[color] || 'bg-gray-400';
};

// Route et Router
const route = useRoute();
const router = useRouter();

// Cart et Notification
const { 
  cartItems, 
  cartItemCount, 
  isCartEmpty, 
  formattedCartTotal,
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity,
  clearCart 
} = useCart();

const { showSuccess, showError } = useUserNotification();

// State
const isSidebarOpen = ref(false);
const isCartOpen = ref(false);
const openAccordion = ref(null);
const isPageLoading = ref(true);
const isPageTransitioning = ref(false);
const dynamicMobileMenu = ref([...mobileMenu]);

// Methods
const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const toggleCart = () => isCartOpen.value = !isCartOpen.value;
const toggleAccordion = (index) => {
  openAccordion.value = openAccordion.value === index ? null : index;
};

const validateCart = () => {
  if (!isCartEmpty.value) {
    // Vérifier si on est déjà sur la page info en mode achat direct
    const isOnInfoPage = route.path === '/info';
    const hasDirectPurchaseData = localStorage.getItem('directPurchaseData');
    
          if (isOnInfoPage && hasDirectPurchaseData) {
        // L'utilisateur est sur la page info en mode achat direct
        // Proposer de passer au panier complet
        if (confirm('Vous êtes actuellement en train d\'acheter un produit directement.\n\nVoulez-vous passer à l\'achat de tout votre panier à la place ?')) {
          // Passer au panier complet en nettoyant les données d'achat direct
          localStorage.removeItem('directPurchaseData');
          // Rediriger vers la page info sans le paramètre directPurchase
          window.location.href = '/info';
        } else {
          // Continuer avec l'achat direct (ne rien faire)
          toggleCart();
        }
      } else {
      // Navigation normale vers la page info
      router.push('/info');
      toggleCart();
    }
  }
};

// Fonction pour charger les catégories dans le menu mobile
const loadMobileCategories = async () => {
  try {
    const categories = await fetchActiveCategories();
    dynamicMobileMenu.value = mobileMenu.map(item => {
      if (item.name === 'Categories') {
        return {
          ...item,
          sublinks: categories
        };
      }
      return item;
    });
  } catch (error) {
    console.error('Erreur lors du chargement des catégories mobile:', error);
  }
};

// Page loading effect
onMounted(() => {
  // Forcer le scroll en haut immédiatement
  window.scrollTo(0, 0);
  
  // Charger les catégories pour le menu mobile
  loadMobileCategories();
  
  // Simuler un chargement initial
  setTimeout(() => {
    isPageLoading.value = false;
  }, 1500);
});

// Page transition effect
watch(() => route.path, async (newPath, oldPath) => {
  if (oldPath && newPath !== oldPath) {
    // Forcer le scroll en haut immédiatement
    window.scrollTo(0, 0);
    
    // Déclencher la transition de page
    isPageTransitioning.value = true;
    
    // Simuler un temps de chargement
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Masquer la transition
    isPageTransitioning.value = false;
  }
}, { immediate: false });
</script>

<style scoped>
/* Page Transition Animations - Plus subtiles */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Loader Animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
