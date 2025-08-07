<template>
    <DefaultLayout>
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

                        <!-- Informations de contact -->
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-shop text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Adresse</h3>
                                    <p class="text-text-secondary">Boutique en ligne</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-envelope text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Email</h3>
                                    <a href="mailto:contact@maboutique.com" class="text-primary hover:underline">contact@maboutique.com</a>
                                </div>
                            </div>
                             <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-8 text-center"><i class="fa-solid fa-phone text-primary text-2xl"></i></div>
                                <div>
                                    <h3 class="font-semibold text-text-primary">Téléphone</h3>
                                    <a href="tel:+22800000000" class="text-primary hover:underline">+228 00 00 00 00</a>
                                </div>
                            </div>
                        </div>

                        <!-- Bouton WhatsApp -->
                        <div class="mt-8">
                             <a href="https://wa.me/22800000000" target="_blank" class="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
                                <i class="fa-brands fa-whatsapp text-2xl mr-3"></i>
                                Contacter via WhatsApp
                            </a>
                        </div>

                        <!-- Réseaux Sociaux -->
                        <div class="mt-10 text-center">
                            <h3 class="font-semibold text-text-primary mb-4">Suivez-nous</h3>
                            <div class="flex justify-center space-x-6">
                                <a href="#" class="text-text-light hover:text-primary transition-colors"><i class="fa-brands fa-facebook-f text-2xl"></i></a>
                                <a href="#" class="text-text-light hover:text-primary transition-colors"><i class="fa-brands fa-twitter text-2xl"></i></a>
                                <a href="#" class="text-text-light hover:text-primary transition-colors"><i class="fa-brands fa-instagram text-2xl"></i></a>
                                <a href="#" class="text-text-light hover:text-primary transition-colors"><i class="fa-brands fa-linkedin-in text-2xl"></i></a>
                            </div>
                        </div>

                    </div>

                    <!-- Colonne de droite : Formulaire -->
                    <div class="bg-white p-8 rounded-lg shadow-lg">
                        <form @submit.prevent="handleSubmit">
                            <div class="space-y-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-text-secondary">Nom complet</label>
                                    <div class="mt-1">
                                        <input v-model="form.name" type="text" name="name" id="name" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-text-secondary">Adresse e-mail</label>
                                    <div class="mt-1">
                                        <input v-model="form.email" type="email" name="email" id="email" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                </div>
                                <div>
                                    <label for="subject" class="block text-sm font-medium text-text-secondary">Sujet</label>
                                    <div class="mt-1">
                                        <input v-model="form.subject" type="text" name="subject" id="subject" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    </div>
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium text-text-secondary">Message</label>
                                    <div class="mt-1">
                                        <textarea v-model="form.message" id="message" name="message" rows="4" required class="block w-full px-3 py-2 border border-border-color rounded-md shadow-sm placeholder-text-light focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                                    </div>
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
import { ref } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

export default {
    name: 'ContactView',
    components: {
        DefaultLayout
    },
    setup() {
        // État réactif pour les champs du formulaire
        const form = ref({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Méthode pour gérer la soumission du formulaire
        function handleSubmit() {
            // Dans une application réelle, vous enverriez ces données à un serveur
            console.log('Données du formulaire soumises:', form.value);
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            
            // Réinitialiser le formulaire après soumission
            form.value = {
                name: '',
                email: '',
                subject: '',
                message: ''
            };
        }

        return {
            form,
            handleSubmit
        };
    }
}
</script>

<style scoped>
/* Les classes TailwindCSS gèrent l'essentiel du style. */
</style>
