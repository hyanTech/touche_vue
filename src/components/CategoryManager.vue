<template>
  <div>
    <!-- Contenu du slot pour afficher les catégories -->
    <slot :categories="categories" :loading="loading" :error="error"></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchActiveCategories, fetchHomeCategories } from '../config/menu.js';

const props = defineProps({
  type: {
    type: String,
    default: 'menu', // 'menu' ou 'home'
    validator: (value) => ['menu', 'home'].includes(value)
  }
});

const categories = ref([]);
const loading = ref(false);
const error = ref(null);

// Fonction pour charger les catégories
const loadCategories = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    if (props.type === 'home') {
      const homeCategories = await fetchHomeCategories();
      categories.value = homeCategories;
    } else {
      const menuCategories = await fetchActiveCategories();
      categories.value = menuCategories;
    }
  } catch (err) {
    console.error('Erreur lors du chargement des catégories:', err);
    error.value = 'Erreur lors du chargement des catégories';
  } finally {
    loading.value = false;
  }
};

// Charger les catégories au montage du composant
onMounted(() => {
  loadCategories();
});

// Exposer la fonction de rechargement
defineExpose({
  reload: loadCategories
});
</script> 