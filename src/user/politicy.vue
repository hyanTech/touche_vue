<template>
    <DefaultLayout>
        <div class="min-h-screen bg-gray-50 py-12">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <!-- En-tête de la page -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
                    <div class="w-24 h-1 bg-primary mx-auto"></div>
                    <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Nous nous engageons à protéger vos données personnelles et à respecter votre vie privée
                    </p>
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
                            <div v-html="confidentialiteContent"></div>
                        </div>
                    </div>

                    <!-- Section des principes de protection -->
                    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <div class="flex items-center mb-4">
                                <div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                                    <i class="fas fa-shield-alt text-green-600 text-lg"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900">Protection des données</h3>
                            </div>
                            <p class="text-gray-600">
                                Vos informations personnelles sont protégées par des mesures de sécurité avancées et ne sont jamais partagées sans votre consentement.
                            </p>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                                    <i class="fas fa-lock text-blue-600 text-lg"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900">Paiement sécurisé </h3>
                            </div>
                            <p class="text-gray-600">
                                Toutes les données transmises sur notre site sont cryptées et 
                                le paiement est sécurisé via Moov Money, Mixx by YAS.
                            </p>
                        </div>
                    </div>

                    <!-- Section contact -->
                    <!-- <div class="mt-12 bg-primary rounded-lg p-8 text-center text-white">
                        <h3 class="text-2xl font-semibold mb-4">Des questions sur la confidentialité ?</h3>
                        <p class="mb-6">Notre équipe est là pour vous aider et répondre à toutes vos questions</p>
                        <a href="/contact" class="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Nous contacter
                        </a>
                    </div> -->
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
    name: 'Politicy',
    components: {
        DefaultLayout
    },
    setup() {
        const confidentialiteContent = ref('')
        const loading = ref(true)
        const error = ref(false)

        const fetchInformation = async () => {
            try {
                loading.value = true
                error.value = false
                const response = await informationService.getInformation()
                
                if (response.data.success) {
                    confidentialiteContent.value = response.data.data.confidentialite
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
            confidentialiteContent,
            loading,
            error,
            fetchInformation
        }
    }
}
</script>

<style scoped>

</style>