<template>
    <DefaultLayout>
        <div class="min-h-screen bg-gray-50 py-12">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <!-- En-tête de la page -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">À propos de nous</h1>
                    <div class="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <!-- Contenu principal -->
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
                        <div v-if="loading" class="text-center py-12">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p class="text-gray-600 mt-4">Chargement...</p>
                        </div>

                        <div v-else-if="error" class="text-center py-12">
                            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                            <p class="text-red-600">Erreur lors du chargement des informations</p>
                            <button @click="fetchInformation" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-hover-color transition-colors">
                                Réessayer
                            </button>
                        </div>

                        <div v-else class="prose prose-lg max-w-none">
                            <div v-html="aProposContent"></div>
                        </div>
                    </div>

                    <!-- Section supplémentaire -->
                    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-tshirt text-white text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Qualité Premium</h3>
                            <p class="text-gray-600">Des vêtements de qualité supérieure sélectionnés avec soin</p>
                        </div>

                        <div class="text-center">
                            <div class="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-tags text-white text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Prix Abordables</h3>
                            <p class="text-gray-600">Des tarifs compétitifs pour tous les budgets</p>
                        </div>

                        <div class="text-center">
                            <div class="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-shipping-fast text-white text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
                            <p class="text-gray-600">Expédition en 24h-48h pour une satisfaction immédiate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { informationService } from '../config/api.js'

export default {
    name: 'APropos',
    components: {
        DefaultLayout
    },
    setup() {
        const aProposContent = ref('')
        const loading = ref(true)
        const error = ref(false)

        const fetchInformation = async () => {
            try {
                loading.value = true
                error.value = false
                const response = await informationService.getInformation()
                console.log(response)
                if (response.data.success) {
                    aProposContent.value = response.data.data.a_propos
                } else {
                    error.value = true
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des informations:', err)
                error.value = true
            } finally {
                loading.value = false
            }
        }

        onMounted(() => {
            fetchInformation()
        })

        return {
            aProposContent,
            loading,
            error,
            fetchInformation
        }
    }
}
</script>

<style scoped>

</style>