<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-center mb-12 text-text-primary">Toutes nos catégories</h1>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p class="mt-4 text-text-secondary">Chargement des catégories...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <i class="fas fa-exclamation-circle text-error-color text-2xl mb-4"></i>
                    <h3 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
                    <p class="text-sm text-red-700 mb-4">{{ error }}</p>
                    <button @click="loadCategories" class="text-sm text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-md">
                        <i class="fas fa-redo mr-1"></i>Réessayer
                    </button>
                </div>
            </div>

            <!-- Grille des catégories avec design moderne -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                <!-- Boucle sur la liste des catégories -->
                <div v-for="category in categories" :key="category.id" 
                     class="group cursor-pointer">
                    
                    <!-- Carte de catégorie -->
                    <div @click="navigateToCategory(category)" 
                         class="bg-white rounded-xl shadow-lg hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 ease-in-out p-6 h-full flex flex-col">
                        
                        <!-- En-tête de la catégorie -->
                        <div class="text-center mb-4">
                            <h2 class="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                {{ category.name }}
                            </h2>
                        </div>
                        
                        <!-- Description de la catégorie -->
                        <div class="flex-grow" v-if="category.description">
                            <p class="text-sm text-text-secondary text-center leading-relaxed line-clamp-3">
                                {{ category.description }}
                            </p>
                        </div>
                        
                        <!-- Indicateur d'action -->
                        <div class="mt-4 text-center">
                            <span class="inline-flex items-center text-primary text-sm font-medium group-hover:text-primary-dark transition-colors">
                                Voir les produits
                                <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { categoryService } from '../config/api.js';

// --- Router ---
const router = useRouter();

// --- États réactifs ---
const categories = ref([]);
const loading = ref(false);
const error = ref('');

// --- Fonctions ---
const loadCategories = async () => {
    loading.value = true;
    error.value = '';

    try {
        const response = await categoryService.getAllActiveCategories();
        
        // Vérifier que la réponse a la structure attendue
        if (response.data && response.data.success && response.data.data) {
            categories.value = response.data.data.map(category => ({
                id: category.id,
                name: category.nom,
                icon: category.icone || 'fa-solid fa-tag',
                description: category.description,
                href: `/produits/category/${category.id}/${category.nom}`
            }));
        } else {
            throw new Error('Format de réponse invalide');
        }
    } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
        error.value = 'Erreur lors du chargement des catégories. Veuillez réessayer.';
    } finally {
        loading.value = false;
    }
};

const navigateToCategory = (category) => {
    router.push(category.href);
};

// --- Initialisation ---
onMounted(() => {
    loadCategories();
});
</script>

<style scoped>
/* Les classes TailwindCSS gèrent l'essentiel du style. */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
