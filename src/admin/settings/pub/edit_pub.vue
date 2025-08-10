<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
                Modifier la Publicité
            </h1>

            <!-- État de chargement -->
            <div v-if="loading" class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Chargement de la publicité...</p>
            </div>

            <!-- État d'erreur -->
            <div v-else-if="error" class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div class="text-red-600 text-6xl mb-4">⚠️</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
                <p class="text-gray-600 mb-6">{{ error }}</p>
                <button @click="loadPublicite" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                    Réessayer
                </button>
            </div>

            <!-- Formulaire de modification -->
            <div v-else class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Section Grille pour les champs principaux -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        <!-- Colonne 1 -->
                        <div class="space-y-6">
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2">Contenu Principal</h2>
                            <!-- Champ Texte 1 -->
                            <div>
                                <label for="text1" class="block text-sm font-medium text-gray-600 mb-1">Titre Principal</label>
                                <input type="text" id="text1" v-model="ad.text1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Offre Spéciale d'Été">
                            </div>

                            <!-- Champ Sous-titre 1 -->
                            <div>
                                <label for="soust_itre1" class="block text-sm font-medium text-gray-600 mb-1">Sous-titre 1</label>
                                <input type="text" id="soust_itre1" v-model="ad.soust_itre1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Jusqu'à -50% de réduction">
                            </div>

                            <!-- Champ Bouton 1 -->
                            <div>
                                <label for="btn1" class="block text-sm font-medium text-gray-600 mb-1">Texte du Bouton 1</label>
                                <input type="text" id="btn1" v-model="ad.btn1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Découvrir">
                            </div>

                            <!-- Champ URL 1 -->
                            <div>
                                <label for="url1" class="block text-sm font-medium text-gray-600 mb-1">URL de destination 1</label>
                                <input type="url" id="url1" v-model="ad.url1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="https://exemple.com/offre1">
                            </div>

                             <!-- Champ Image 1 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-600 mb-2">Image Principale</label>
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div class="space-y-1 text-center">
                                        <img v-if="previewImg1 || ad.img1" :src="previewImg1 || ad.img1" alt="Aperçu de l'image 1" class="mx-auto h-24 w-auto object-cover rounded-md mb-4">
                                        <svg v-else class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l-6 6h6V8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20 24h16v12a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="img1" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Télécharger un fichier</span>
                                                <input id="img1" name="img1" type="file" @change="onFileChange($event, 'img1')" class="sr-only">
                                            </label>
                                            <p class="pl-1">ou glisser-déposer</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Colonne 2 -->
                        <div class="space-y-6">
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2">Contenu Secondaire (Optionnel)</h2>
                            <!-- Champ Texte 2 -->
                            <div>
                                <label for="text2" class="block text-sm font-medium text-gray-600 mb-1">Titre Secondaire</label>
                                <input type="text" id="text2" v-model="ad.text2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Vente Flash">
                            </div>

                            <!-- Champ Sous-titre 2 -->
                            <div>
                                <label for="soust_itre2" class="block text-sm font-medium text-gray-600 mb-1">Sous-titre 2</label>
                                <input type="text" id="soust_itre2" v-model="ad.soust_itre2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Quantités limitées">
                            </div>

                            <!-- Champ Bouton 2 -->
                            <div>
                                <label for="btn2" class="block text-sm font-medium text-gray-600 mb-1">Texte du Bouton 2</label>
                                <input type="text" id="btn2" v-model="ad.btn2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="Ex: Acheter maintenant">
                            </div>

                            <!-- Champ URL 2 -->
                            <div>
                                <label for="url2" class="block text-sm font-medium text-gray-600 mb-1">URL de destination 2</label>
                                <input type="url" id="url2" v-model="ad.url2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="https://exemple.com/offre2">
                            </div>
                            
                            <!-- Champ Image 2 -->
                             <div>
                                <label class="block text-sm font-medium text-gray-600 mb-2">Image Secondaire</label>
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div class="space-y-1 text-center">
                                        <img v-if="previewImg2 || ad.img2" :src="previewImg2 || ad.img2" alt="Aperçu de l'image 2" class="mx-auto h-24 w-auto object-cover rounded-md mb-4">
                                        <svg v-else class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l-6 6h6V8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20 24h16v12a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="img2" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Télécharger un fichier</span>
                                                <input id="img2" name="img2" type="file" @change="onFileChange($event, 'img2')" class="sr-only">
                                            </label>
                                            <p class="pl-1">ou glisser-déposer</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Boutons d'action -->
                    <div class="flex justify-end pt-6 border-t mt-8">
                        <button type="button" @click="goBack" class="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-200 mr-4">
                            Annuler
                        </button>
                        <button type="submit" :disabled="submitting" class="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="submitting" class="flex items-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enregistrement...
                            </span>
                            <span v-else>Enregistrer les modifications</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { headerService } from '../../../config/api.js';
import { notificationService } from '../../../config/notification.js';

export default {
    name: 'EditPub',
    
    setup() {
        const route = useRoute();
        const router = useRouter();
        
        // États réactifs
        const loading = ref(true);
        const error = ref(null);
        const submitting = ref(false);
        
        // Données réactives pour le formulaire
        const ad = reactive({
            text1: '',
            text2: '',
            soust_itre1: '',
            soust_itre2: '',
            btn1: '',
            btn2: '',
            url1: '',
            url2: '',
            img1: null,
            img2: null,
        });

        // Références pour les aperçus d'images
        const previewImg1 = ref(null);
        const previewImg2 = ref(null);

        /**
         * Charge les données de la publicité existante
         */
        const loadPublicite = async () => {
            const id = route.params.id;
            
            if (!id) {
                error.value = 'ID de publicité manquant';
                loading.value = false;
                return;
            }

            try {
                loading.value = true;
                error.value = null;
                
                const response = await headerService.getHeader(id);
                console.log(response);
                if (response.data.success) {
                    const Data = response.data.data;
                    
                    // Mapper les données de l'API vers le formulaire
                    ad.text1 = Data.titre_pub1 || '';
                    ad.text2 = Data.titre_pub2 || '';
                    ad.soust_itre1 = Data.sous_titre1 || '';
                    ad.soust_itre2 = Data.sous_titre2 || '';
                    ad.btn1 = Data.btn1 || '';
                    ad.btn2 = Data.btn2 || '';
                    ad.url1 = Data.url1 || '';
                    ad.url2 = Data.url2 || '';
                    ad.img1 = Data.img1 || null;
                    ad.img2 = Data.img2 || null;
                    
                } else {
                    error.value = response.data.message || 'Erreur lors du chargement de la publicité';
                }
            } catch (err) {
                console.error('Erreur lors du chargement de la publicité:', err);
                error.value = err.response?.data?.message || 'Erreur de connexion au serveur';
                notificationService.error('Erreur lors du chargement de la publicité');
            } finally {
                loading.value = false;
            }
        };

        /**
         * Gère le changement de fichier pour les images et affiche un aperçu.
         * @param {Event} event - L'événement de changement de fichier.
         * @param {string} imgKey - La clé de l'image à mettre à jour ('img1' ou 'img2').
         */
        const onFileChange = (event, imgKey) => {
            const file = event.target.files[0];
            if (!file) return;

            console.log(`Fichier sélectionné pour ${imgKey}:`, file);
            console.log(`Type de fichier:`, file.type);
            console.log(`Taille:`, file.size);

            // Stocke le fichier
            ad[imgKey] = file;

            // Crée un aperçu
            const reader = new FileReader();
            reader.onload = (e) => {
                if (imgKey === 'img1') {
                    previewImg1.value = e.target.result;
                } else if (imgKey === 'img2') {
                    previewImg2.value = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        };

        /**
         * Gère la soumission du formulaire.
         */
        const handleSubmit = async () => {
            const Id = route.params.id;
            
            if (!Id) {
                notificationService.error('ID de publicité manquant');
                return;
            }

            try {
                submitting.value = true;
                
                // Préparer les données pour l'API
                const formData = new FormData();
                
                // Ajouter les champs texte
                formData.append('titre_pub1', ad.text1);
                formData.append('titre_pub2', ad.text2);
                formData.append('sous_titre1', ad.soust_itre1);
                formData.append('sous_titre2', ad.soust_itre2);
                formData.append('btn1', ad.btn1);
                formData.append('btn2', ad.btn2);
                formData.append('url1', ad.url1);
                formData.append('url2', ad.url2);
                
                // Ajouter les images
                if (ad.img1 instanceof File) {
                    // Nouvelle image sélectionnée - envoyer le fichier
                    formData.append('img1', ad.img1);
                } else if (ad.img1 && typeof ad.img1 === 'string') {
                    // Image existante (URL) - envoyer l'URL
                    formData.append('img1', ad.img1);
                }
                
                if (ad.img2 instanceof File) {
                    // Nouvelle image sélectionnée - envoyer le fichier
                    formData.append('img2', ad.img2);
                } else if (ad.img2 && typeof ad.img2 === 'string') {
                    // Image existante (URL) - envoyer l'URL
                    formData.append('img2', ad.img2);
                }
                
                // Appeler l'API de mise à jour
                const response = await headerService.updateHeader(Id, formData);
                
                if (response.data.success) {
                    notificationService.success('Publicité mise à jour avec succès');
                    
                    // Rediriger vers la page de gestion des publicités
                    setTimeout(() => {
                        router.push({ name: 'Pub' });
                    }, 1500);
                } else {
                    notificationService.error(response.data.message || 'Erreur lors de la mise à jour');
                }
            } catch (err) {
                console.error('Erreur lors de la mise à jour:', err);
                notificationService.error(err.response?.data?.message || 'Erreur de connexion au serveur');
            } finally {
                submitting.value = false;
            }
        };

        /**
         * Retourne à la page précédente
         */
        const goBack = () => {
            router.go(-1);
        };

        // Charger les données au montage du composant
        onMounted(() => {
            loadPublicite();
        });

        return {
            ad,
            loading,
            error,
            submitting,
            previewImg1,
            previewImg2,
            onFileChange,
            handleSubmit,
            loadPublicite,
            goBack,
        };
    },
};
</script>

<style>
/* Pour une meilleure intégration, assurez-vous que Tailwind CSS est bien configuré dans votre projet. */
/* Aucune CSS personnalisée n'est nécessaire si Tailwind est correctement installé. */
</style>
