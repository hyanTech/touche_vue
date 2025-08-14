<template>
    <DefaultLayout>
        <!-- Notification d'alerte -->
        <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm w-full">
            <div :class="[
                'rounded-lg p-4 shadow-lg border-l-4',
                notification.type === 'success' 
                    ? 'bg-green-50 border-green-400 text-green-800' 
                    : 'bg-red-50 border-red-400 text-red-800'
            ]">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i v-if="notification.type === 'success'" class="fa-solid fa-check-circle text-green-400 text-xl"></i>
                        <i v-else class="fa-solid fa-exclamation-circle text-red-400 text-xl"></i>
                    </div>
                    <div class="ml-3 flex-1">
                        <p class="text-sm font-medium" v-html="notification.message"></p>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                        <button 
                            @click="notification.show = false"
                            class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                        >
                            <i class="fa-solid fa-times text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-bg-secondary">
            <div class="container mx-auto px-4 py-12 sm:py-16">

                <!-- Titre de la page -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-extrabold text-text-primary sm:text-5xl">
                        Contactez-nous
                    </h1>
                    <p class="mt-4 text-lg text-text-secondary">
                        Une question ? Une suggestion ? N'hésitez pas à nous écrire.
                    </p>
                </div>

                <!-- Contenu principal (grille 2 colonnes) -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <!-- Colonne de gauche : Informations de contact -->
                    <div class="bg-white p-8 rounded-lg shadow-lg">
                        <h2 class="text-2xl font-bold text-text-primary mb-6">Nos Coordonnées</h2>
                        
                        <p class="text-text-secondary mb-8">
                            Nous sommes à votre écoute pour toute demande. Vous pouvez nous joindre via les canaux ci-dessous.
                        </p>

                        <!-- Informations de contact dynamiques -->
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-shop text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Adresse</h3>
                                    <p class="text-text-secondary">{{ contactInfo.adresse || 'Boutique en ligne' }}</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-envelope text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Email</h3>
                                    <a v-if="contactInfo.email" :href="`mailto:${contactInfo.email}`" class="text-primary hover:underline">{{ contactInfo.email }}</a>
                                    <span v-else class="text-text-secondary">contact@touchedeseduction.com</span>
                                </div>
                            </div>
                             <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-phone text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Téléphone</h3>
                                    <a v-if="contactInfo.numero" :href="`tel:${contactInfo.numero}`" class="text-primary hover:underline">{{ contactInfo.numero }}</a>
                                    <span v-else class="text-text-secondary">+228 00 00 00 00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Bouton WhatsApp dynamique -->
                        <div class="mt-8" v-if="contactInfo.lien_whatsapp">
                             <a :href="contactInfo.lien_whatsapp" target="_blank" class="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
                                <i class="fa-brands fa-whatsapp text-2xl mr-3"></i>
                                Contacter via WhatsApp
                            </a>
                        </div>

                        <!-- Réseaux Sociaux dynamiques -->
                        <div class="mt-10 text-center">
                            <h3 class="font-semibold text-text-primary mb-4">Suivez-nous</h3>
                            <div class="flex justify-center space-x-6">
                                <a v-if="contactInfo.lien_facebook" :href="contactInfo.lien_facebook" target="_blank" class="text-text-light hover:text-primary transition-colors">
                                    <i class="fa-brands fa-facebook-f text-2xl"></i>
                                </a>
                                <a v-if="contactInfo.lien_x" :href="contactInfo.lien_x" target="_blank" class="text-text-light hover:text-primary transition-colors">
                                    <i class="fa-brands fa-twitter text-2xl"></i>
                                </a>
                                <a v-if="contactInfo.lien_insta" :href="contactInfo.lien_insta" target="_blank" class="text-text-light hover:text-primary transition-colors">
                                    <i class="fa-brands fa-instagram text-2xl"></i>
                                </a>
                                <a v-if="contactInfo.lien_tiktok" :href="contactInfo.lien_tiktok" target="_blank" class="text-text-light hover:text-primary transition-colors">
                                    <i class="fa-brands fa-tiktok text-2xl"></i>
                                </a>
                            </div>
                        </div>

                    </div>

                    <!-- Colonne de droite : Formulaire -->
                    <div class="bg-white p-8 rounded-lg shadow-lg">
                        <form @submit.prevent="handleSubmit">
                            <div class="space-y-6">
                                <div>
                                    <label for="nom_complet" class="block text-sm font-medium text-text-secondary">Nom complet</label>
                                    <div class="mt-1">
                                        <input v-model="form.nom_complet" type="text" name="nom_complet" id="nom_complet" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                    <p v-if="errors.nom_complet" class="mt-1 text-sm text-red-600">{{ errors.nom_complet }}</p>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-text-secondary">Adresse e-mail</label>
                                    <div class="mt-1">
                                        <input v-model="form.email" type="email" name="email" id="email" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                                </div>
                                <div>
                                    <label for="objet" class="block text-sm font-medium text-text-secondary">Objet</label>
                                    <div class="mt-1">
                                        <input v-model="form.objet" type="text" name="objet" id="objet" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                    <p v-if="errors.objet" class="mt-1 text-sm text-red-600">{{ errors.objet }}</p>
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium text-text-secondary">Message</label>
                                    <div class="mt-1">
                                        <textarea v-model="form.message" id="message" name="message" rows="4" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                                    </div>
                                    <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
                                </div>
                                <div>
                                    <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Envoyer le message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { contactService } from '../config/api.js';

export default {
    name: 'ContactView',
    components: {
        DefaultLayout
    },
    setup() {
        // État réactif pour les informations de contact
        const contactInfo = ref({
            adresse: '',
            email: '',
            numero: '',
            lien_whatsapp: '',
            lien_facebook: '',
            lien_insta: '',
            lien_tiktok: '',
            lien_x: ''
        });

        // État réactif pour les champs du formulaire
        const form = ref({
            nom_complet: '',
            email: '',
            objet: '',
            message: ''
        });

        // État réactif pour les erreurs de validation
        const errors = ref({
            nom_complet: '',
            email: '',
            objet: '',
            message: ''
        });

        // État réactif pour les notifications
        const notification = ref({
            show: false,
            type: 'success', // 'success' ou 'error'
            message: ''
        });

        // Récupérer les informations de contact depuis l'API
        const fetchContactInfo = async () => {
            try {
                const response = await contactService.getContact(1);
                if (response.data.success) {
                    contactInfo.value = response.data.data;
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations de contact:', error);
            }
        };

        // Validation côté client
        function validateForm() {
            // Réinitialiser les erreurs
            errors.value = {
                nom_complet: '',
                email: '',
                objet: '',
                message: ''
            };

            let isValid = true;

            // Validation du nom complet
            if (!form.value.nom_complet.trim()) {
                errors.value.nom_complet = 'Le nom complet est requis';
                isValid = false;
            } else if (form.value.nom_complet.trim().length < 2 || form.value.nom_complet.trim().length > 100) {
                errors.value.nom_complet = 'Le nom complet doit contenir entre 2 et 100 caractères';
                isValid = false;
            }

            // Validation de l'email
            if (!form.value.email.trim()) {
                errors.value.email = 'L\'email est requis';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
                errors.value.email = 'L\'email doit être une adresse email valide';
                isValid = false;
            }

            // Validation de l'objet
            if (!form.value.objet.trim()) {
                errors.value.objet = 'L\'objet est requis';
                isValid = false;
            } else if (form.value.objet.trim().length < 5 || form.value.objet.trim().length > 200) {
                errors.value.objet = 'L\'objet doit contenir entre 5 et 200 caractères';
                isValid = false;
            }

            // Validation du message
            if (!form.value.message.trim()) {
                errors.value.message = 'Le message est requis';
                isValid = false;
            } else if (form.value.message.trim().length < 10 || form.value.message.trim().length > 2000) {
                errors.value.message = 'Le message doit contenir entre 10 et 2000 caractères';
                isValid = false;
            }

            return isValid;
        }

        // Méthode pour afficher une notification
        function showNotification(type, message) {
            notification.value = {
                show: true,
                type,
                message
            };
            
            // Masquer automatiquement la notification après 5 secondes
            setTimeout(() => {
                notification.value.show = false;
            }, 5000);
        }

        // Méthode pour gérer la soumission du formulaire
        async function handleSubmit() {
            // Valider le formulaire avant envoi
            if (!validateForm()) {
                return;
            }

            try {
                // Envoyer le message via l'API
                const response = await contactService.sendMessage(form.value);
                
                if (response.status === 200) {
                    // Succès
                    showNotification('success', 'Merci pour votre message ! Nous vous répondrons bientôt.');
                    
                    // Réinitialiser le formulaire après soumission
                    form.value = {
                        nom_complet: '',
                        email: '',
                        objet: '',
                        message: ''
                    };
                    
                    // Réinitialiser les erreurs
                    errors.value = {
                        nom_complet: '',
                        email: '',
                        objet: '',
                        message: ''
                    };
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
                
                if (error.response?.data?.errors) {
                    // Afficher les erreurs de validation du serveur
                    const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
                    showNotification('error', `Erreur de validation:\n${errorMessages}`);
                } else {
                    showNotification('error', 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
                }
            }
        }

        // Charger les informations de contact au montage du composant
        onMounted(() => {
            fetchContactInfo();
        });

        return {
            contactInfo,
            form,
            errors,
            notification,
            handleSubmit
        };
    }
}
</script>

<style scoped>
/* Les classes TailwindCSS gèrent l'essentiel du style. */
</style>
