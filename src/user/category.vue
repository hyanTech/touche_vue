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

            <!-- Grille des catégories avec icônes circulaires -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 sm:gap-x-6">
                <!-- Boucle sur la liste des catégories -->
                <div v-for="category in categories" :key="category.id" 
                     class="group cursor-pointer text-center">
                    
                    <!-- Le cercle contenant l'icône -->
                    <div @click="navigateToCategory(category)" 
                         class="mx-auto flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg transform group-hover:shadow-primary/20 group-hover:scale-105 transition-all duration-300 ease-in-out">
                        <i :class="[category.icon, 'text-4xl text-primary']"></i>
                    </div>

                    <!-- Nom de la catégorie -->
                    <div class="p-4">
                        <h2 @click="navigateToCategory(category)" 
                            class="text-base sm:text-lg font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer">
                            {{ category.name }}
                        </h2>
                        <!-- Description de la catégorie -->
                        <p v-if="category.description" class="text-sm text-text-secondary mt-2 line-clamp-2">
                            {{ category.description }}
                        </p>
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
</style>
