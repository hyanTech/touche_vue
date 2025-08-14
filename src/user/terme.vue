<template>
    <DefaultLayout>
        <div class="min-h-screen bg-gray-50 py-12">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <!-- En-tête de la page -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Termes et conditions</h1>
                    <div class="w-24 h-1 bg-primary mx-auto"></div>
                    <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Veuillez lire attentivement ces conditions avant d'utiliser notre site
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
                            <div v-html="termeContent"></div>
                        </div>
                    </div>

                    <!-- Section des points clés -->
                    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div class="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-exclamation-triangle text-orange-600 text-xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Acceptation</h3>
                            <p class="text-gray-600 text-sm">
                                En utilisant notre site, vous acceptez automatiquement nos conditions d'utilisation
                            </p>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-edit text-blue-600 text-xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Modifications</h3>
                            <p class="text-gray-600 text-sm">
                                Nous nous réservons le droit de modifier ces conditions à tout moment
                            </p>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-box text-green-600 text-xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Disponibilité</h3>
                            <p class="text-gray-600 text-sm">
                                Les commandes sont soumises à la disponibilité des stocks
                            </p>
                        </div>
                    </div>

                    <!-- Section d'information -->
                    <!-- <div class="mt-12 bg-gray-100 rounded-lg p-8">
                        <div class="text-center">
                            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Questions sur nos conditions ?</h3>
                            <p class="text-gray-600 mb-6">
                                Notre équipe est disponible pour clarifier tout point concernant nos termes et conditions
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/contact" class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-hover-color transition-colors">
                                    Nous contacter
                                </a>
                                <a href="/politicy" class="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                                    Politique de confidentialité
                                </a>
                            </div>
                        </div>
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
    name: 'Terme',
    components: {
        DefaultLayout
    },
    setup() {
        const termeContent = ref('')
        const loading = ref(true)
        const error = ref(false)

        const fetchInformation = async () => {
            try {
                loading.value = true
                error.value = false
                const response = await informationService.getInformation()
                
                if (response.data.success) {
                    termeContent.value = response.data.data.terme
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
            termeContent,
            loading,
            error,
            fetchInformation
        }
    }
}
</script>

<style scoped>

</style>