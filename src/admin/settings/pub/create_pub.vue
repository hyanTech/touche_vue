<template>
    <div class="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
                Créer une Nouvelle Publicité
            </h1>

            <div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p class="text-sm text-blue-800">
                        <strong>Note :</strong> Tous les champs marqués d'un * sont obligatoires.
                    </p>
                </div>
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Section Grille pour les champs principaux -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        <!-- Colonne 1 -->
                        <div class="space-y-6">
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2">Contenu Principal</h2>
                            <!-- Champ Texte 1 -->
                            <div>
                                <label for="text1" class="block text-sm font-medium text-gray-600 mb-1">Titre Principal *</label>
                                <input type="text" id="text1" v-model="pub.text1" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.text1 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Offre Spéciale d'Été">
                                <p v-if="errors.text1" class="mt-1 text-sm text-red-600">{{ errors.text1 }}</p>
                            </div>

                            <!-- Champ Sous-titre 1 -->
                            <div>
                                <label for="soust_itre1" class="block text-sm font-medium text-gray-600 mb-1">Sous-titre 1 *</label>
                                <input type="text" id="soust_itre1" v-model="pub.soust_itre1" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.soust_itre1 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Jusqu'à -50% de réduction">
                                <p v-if="errors.soust_itre1" class="mt-1 text-sm text-red-600">{{ errors.soust_itre1 }}</p>
                            </div>

                            <!-- Champ Bouton 1 -->
                            <div>
                                <label for="btn1" class="block text-sm font-medium text-gray-600 mb-1">Texte du Bouton 1 *</label>
                                <input type="text" id="btn1" v-model="pub.btn1" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.btn1 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Découvrir">
                                <p v-if="errors.btn1" class="mt-1 text-sm text-red-600">{{ errors.btn1 }}</p>
                            </div>

                            <!-- Champ URL 1 -->
                            <div>
                                <label for="url1" class="block text-sm font-medium text-gray-600 mb-1">URL de destination 1 *</label>
                                <input type="url" id="url1" v-model="pub.url1" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.url1 ? 'border-red-500' : 'border-gray-300']" placeholder="https://exemple.com/offre1">
                                <p v-if="errors.url1" class="mt-1 text-sm text-red-600">{{ errors.url1 }}</p>
                            </div>

                             <!-- Champ Image 1 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-600 mb-2">Image Principale *</label>
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg" :class="errors.img1 ? 'border-red-500' : 'border-gray-300'">
                                    <div class="space-y-1 text-center">
                                        <img v-if="previewImg1" :src="previewImg1" alt="Aperçu de l'image 1" class="mx-auto h-24 w-auto object-cover rounded-md mb-4">
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
                                <p v-if="errors.img1" class="mt-1 text-sm text-red-600">{{ errors.img1 }}</p>
                            </div>
                        </div>

                        <!-- Colonne 2 -->
                        <div class="space-y-6">
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2">Contenu Secondaire (Optionnel)</h2>
                            <!-- Champ Texte 2 -->
                            <div>
                                <label for="text2" class="block text-sm font-medium text-gray-600 mb-1">Titre Secondaire *</label>
                                <input type="text" id="text2" v-model="pub.text2" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.text2 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Vente Flash">
                                <p v-if="errors.text2" class="mt-1 text-sm text-red-600">{{ errors.text2 }}</p>
                            </div>

                            <!-- Champ Sous-titre 2 -->
                            <div>
                                <label for="soust_itre2" class="block text-sm font-medium text-gray-600 mb-1">Sous-titre 2 *</label>
                                <input type="text" id="soust_itre2" v-model="pub.soust_itre2" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.soust_itre2 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Quantités limitées">
                                <p v-if="errors.soust_itre2" class="mt-1 text-sm text-red-600">{{ errors.soust_itre2 }}</p>
                            </div>

                            <!-- Champ Bouton 2 -->
                            <div>
                                <label for="btn2" class="block text-sm font-medium text-gray-600 mb-1">Texte du Bouton 2 *</label>
                                <input type="text" id="btn2" v-model="pub.btn2" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.btn2 ? 'border-red-500' : 'border-gray-300']" placeholder="Ex: Acheter maintenant">
                                <p v-if="errors.btn2" class="mt-1 text-sm text-red-600">{{ errors.btn2 }}</p>
                            </div>

                            <!-- Champ URL 2 -->
                            <div>
                                <label for="url2" class="block text-sm font-medium text-gray-600 mb-1">URL de destination 2 *</label>
                                <input type="url" id="url2" v-model="pub.url2" :class="['w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200', errors.url2 ? 'border-red-500' : 'border-gray-300']" placeholder="https://exemple.com/offre2">
                                <p v-if="errors.url2" class="mt-1 text-sm text-red-600">{{ errors.url2 }}</p>
                            </div>
                            
                            <!-- Champ Image 2 -->
                             <div>
                                <label class="block text-sm font-medium text-gray-600 mb-2">Image Secondaire *</label>
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg" :class="errors.img2 ? 'border-red-500' : 'border-gray-300'">
                                    <div class="space-y-1 text-center">
                                        <img v-if="previewImg2" :src="previewImg2" alt="Aperçu de l'image 2" class="mx-auto h-24 w-auto object-cover rounded-md mb-4">
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
                                <p v-if="errors.img2" class="mt-1 text-sm text-red-600">{{ errors.img2 }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Boutons d'action -->
                    <div class="flex justify-end pt-6 border-t mt-8">
                        <button type="button" @click="goBack" class="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-200 mr-4">
                            Annuler
                        </button>
                        <button type="submit" :disabled="submitting" :class="['font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-md', submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700']">
                            <span v-if="submitting">Création en cours...</span>
                            <span v-else>Créer la Publicité</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { headerService } from '../../../config/api.js';
import { notificationService } from '../../../config/notification.js';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

export default {
    name: 'CreatePub',
    setup() {
        const router = useRouter();
        
        const pub = reactive({
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

        const previewImg1 = ref(null);
        const previewImg2 = ref(null);
        const submitting = ref(false);
        const errors = ref({});

        /**
         * Valide que tous les champs obligatoires sont remplis
         */
        const validateForm = () => {
            errors.value = {};
            
            if (!pub.text1.trim()) {
                errors.value.text1 = 'Le titre principal est obligatoire';
            }
            if (!pub.soust_itre1.trim()) {
                errors.value.soust_itre1 = 'Le sous-titre 1 est obligatoire';
            }
            if (!pub.btn1.trim()) {
                errors.value.btn1 = 'Le texte du bouton 1 est obligatoire';
            }
            if (!pub.url1.trim()) {
                errors.value.url1 = 'L\'URL de destination 1 est obligatoire';
            }
            if (!pub.img1) {
                errors.value.img1 = 'L\'image principale est obligatoire';
            }
            if (!pub.text2.trim()) {
                errors.value.text2 = 'Le titre secondaire est obligatoire';
            }
            if (!pub.soust_itre2.trim()) {
                errors.value.soust_itre2 = 'Le sous-titre 2 est obligatoire';
            }
            if (!pub.btn2.trim()) {
                errors.value.btn2 = 'Le texte du bouton 2 est obligatoire';
            }
            if (!pub.url2.trim()) {
                errors.value.url2 = 'L\'URL de destination 2 est obligatoire';
            }
            if (!pub.img2) {
                errors.value.img2 = 'L\'image secondaire est obligatoire';
            }

            return Object.keys(errors.value).length === 0;
        };

        /**
         * Gère le changement de fichier pour les images et affiche un aperçu.
         * @param {Event} event - L'événement de changement de fichier.
         * @param {string} imgKey - La clé de l'image à mettre à jour ('img1' ou 'img2').
         */
        const onFileChange = (event, imgKey) => {
            const file = event.target.files[0];
            if (!file) return;

            // Stocke le fichier
            pub[imgKey] = file;

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

            // Efface l'erreur si elle existe
            if (errors.value[imgKey]) {
                delete errors.value[imgKey];
            }
        };

        /**
         * Gère la soumission du formulaire.
         */
        const handleSubmit = async () => {
            if (!validateForm()) {
                notificationService.error('Veuillez remplir tous les champs obligatoires');
                return;
            }

            submitting.value = true;

            try {
                // Préparer les données pour l'API
                const formData = new FormData();
                
                // Ajouter les champs texte
                formData.append('titre_pub1', pub.text1);
                formData.append('titre_pub2', pub.text2);
                formData.append('sous_titre1', pub.soust_itre1);
                formData.append('sous_titre2', pub.soust_itre2);
                formData.append('btn1', pub.btn1);
                formData.append('btn2', pub.btn2);
                formData.append('url1', pub.url1);
                formData.append('url2', pub.url2);
                
                // Ajouter les images
                formData.append('img1', pub.img1);
                formData.append('img2', pub.img2);
                
                // Appeler l'API de création
                const response = await headerService.createHeader(formData);
                
                if (response.data.success) {
                    notificationService.success('Publicité créée avec succès');
                    
                    // Rediriger vers la page de gestion des publicités
                    setTimeout(() => {
                        router.push({ name: 'Pub' });
                    }, 1500);
                } else {
                    notificationService.error(response.data.message || 'Erreur lors de la création');
                }
            } catch (err) {
                console.error('Erreur lors de la création:', err);
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

        return {
            pub,
            previewImg1,
            previewImg2,
            submitting,
            errors,
            onFileChange,
            handleSubmit,
            goBack,
        };
    },
};
</script>

<style>
/* Pour une meilleure intégration, assurez-vous que Tailwind CSS est bien configuré dans votre projet. */
/* Aucune CSS personnalisée n'est nécessaire si Tailwind est correctement installé. */
</style>
