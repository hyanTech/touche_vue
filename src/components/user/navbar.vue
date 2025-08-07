<template>
  <header class="bg-accent shadow-md sticky top-0 z-40">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img src="/src/assets/logo.png" alt="Logo" class="h-28 w-auto">
          </router-link>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-1">
          <div v-for="link in menuWithCategories" :key="link.name" class="relative group">
            <a :href="link.href" class="px-4 py-2 text-text-secondary hover:text-primary transition duration-150 flex items-center cursor-pointer">
              <i v-if="link.icon" :class="link.icon" class="mr-2"></i>
              {{ link.name }}
              <i v-if="link.sublinks && link.sublinks.length > 0" class="fas fa-chevron-down ml-2 text-xs"></i>
              <span v-if="link.badge" class="ml-2 bg-error-color text-white text-xs px-2 py-1 rounded-full">{{ link.badge }}</span>
            </a>
            <div v-if="link.sublinks && link.sublinks.length > 0" class="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 w-80 p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 grid grid-cols-2 gap-4">
              <div v-for="sublink in link.sublinks" :key="sublink.name" class="flex items-start space-x-3 p-2 rounded-md hover:bg-accent transition-colors">
                <i v-if="sublink.icon" :class="sublink.icon" class="text-primary mt-1"></i>
                <div>
                  <a :href="sublink.href" class="block text-sm font-medium text-text-secondary hover:text-primary cursor-pointer">{{ sublink.name }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="hidden sm:block relative">
            <input type="text" placeholder="Rechercher..." class="w-40 lg:w-64 pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <span class="absolute inset-y-0 right-0 flex items-center pr-3"><i class="fas fa-search h-5 w-5 text-text-light"></i></span>
          </div>
          <!-- <a href="#" class="text-text-secondary hover:text-primary cursor-pointer"><i class="fas fa-user h-6 w-6"></i></a> -->
          <button @click="$emit('toggle-cart')" class="relative text-text-secondary hover:text-primary cursor-pointer">
            <i class="fas fa-shopping-cart h-6 w-6"></i>
            <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </button>
          <button @click="$emit('toggle-sidebar')" class="md:hidden text-text-secondary hover:text-primary cursor-pointer"><i class="fas fa-bars h-6 w-6"></i></button>
        </div>
      </div>
    </nav>
  </header>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { mainMenu, fetchActiveCategories } from '../../config/menu.js';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  },
  cartItemCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['toggle-sidebar', 'toggle-cart']);

// État réactif pour le menu avec catégories
const menuWithCategories = ref([...mainMenu]);

// Fonction pour mettre à jour le menu avec les catégories
const updateMenuWithCategories = (categories) => {
  menuWithCategories.value = mainMenu.map(item => {
    if (item.name === 'Categories') {
      return {
        ...item,
        sublinks: categories
      };
    }
    return item;
  });
};

// Charger les catégories au montage du composant
onMounted(async () => {
  try {
    const categories = await fetchActiveCategories();
    updateMenuWithCategories(categories);
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error);
  }
});
</script>
