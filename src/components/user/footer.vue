<template>
  <footer class="bg-secondary text-text-primary mt-12 pt-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Newsletter -->
      <!-- <div class="bg-white/50 rounded-lg p-8 md:p-12 text-center mb-12">
        <h3 class="text-3xl font-bold mb-2 text-text-primary">Rejoignez notre communauté</h3>
        <p class="text-text-secondary mb-6 max-w-2xl mx-auto">Inscrivez-vous à notre newsletter pour recevoir les dernières tendances.</p>
        <form class="flex flex-col sm:flex-row max-w-md mx-auto">
          <input type="email" placeholder="Votre adresse email" class="w-full sm:w-2/3 rounded-md sm:rounded-r-none px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary mb-2 sm:mb-0">
          <button class="w-full sm:w-1/3 bg-primary hover:bg-hover-color rounded-md sm:rounded-l-none px-4 py-3 transition cursor-pointer font-semibold">S'inscrire</button>
        </form>
      </div> -->



      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">

        <div class="flex flex-col items-center">
          <div class="flex items-center mb-4">
            <img src="/src/assets/logo.png" alt="Logo" class="h-32 w-auto">
          </div>
          <!-- <p class="text-text-secondary text-center mb-4">La mode à portée de clic. Qualité et style pour tous.</p> -->
          <div class="flex space-x-4 mt-4">
            <!-- Réseaux sociaux dynamiques -->
            <a v-if="contactInfo.lien_facebook" :href="contactInfo.lien_facebook" target="_blank"
              class="text-text-secondary hover:text-text-primary transition-colors">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a v-if="contactInfo.lien_insta" :href="contactInfo.lien_insta" target="_blank"
              class="text-text-secondary hover:text-text-primary transition-colors">
              <i class="fab fa-instagram"></i>
            </a>
            <a v-if="contactInfo.lien_x" :href="contactInfo.lien_x" target="_blank"
              class="text-text-secondary hover:text-text-primary transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
            <a v-if="contactInfo.lien_tiktok" :href="contactInfo.lien_tiktok" target="_blank"
              class="text-text-secondary hover:text-text-primary transition-colors">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-text-primary mb-4">Entreprise</h3>
          <ul class="space-y-2">
            <li><a href="/a_propos" class="text-text-secondary hover:text-text-primary transition cursor-pointer">À propos</a>
            </li>
            <li><a href="/contact"
                class="text-text-secondary hover:text-text-primary transition cursor-pointer">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-text-primary mb-4">Boutique</h3>
          <ul class="space-y-2">
            <li><a href="/produits" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Nos
                produits</a></li>
            <li><a href="/categories" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Nos
                catégories</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-text-primary mb-4">Légal</h3>
          <ul class="space-y-2">
            <li><a href="/politicy"
                class="text-text-secondary hover:text-text-primary transition cursor-pointer">Politique de
                confidentialité</a></li>
            <li><a href="/terme" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Termes &
                Conditions</a></li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Section Livraison et Paiement -->
    <div class="bg-secondary py-5">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Livraison -->
        <div class="text-center mb-5">
          <div class="flex items-center justify-center space-x-3 text-gray-200 mb-3">
            <i class="fas fa-shipping-fast text-black text-base"></i>
            <span class="text-sm  text-black font-medium">Livraison dans un délai de 24/48h</span>
          </div>
        </div>

        <!-- Paiement -->
        <div class="text-center mb-4">
          <h4 class="text-base font-medium text-black mb-3">
            <i class="fas fa-shield-alt text-black mr-2"></i>
            Paiement sécurisé
          </h4>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-8">
          <!-- Moov Money -->
          <div class="flex items-center space-x-2">
            <div class="bg-white rounded p-1.5 shadow-sm">
              <img src="/src/assets/moov.png" alt="Moov Money" class="h-3 w-auto object-contain">
            </div>
            <span class="text-black text-xs">Moov Money</span>
          </div>

          <!-- Mixx by YAS -->
          <div class="flex items-center space-x-2">
            <div class="bg-white rounded p-1.5 shadow-sm">
              <img src="/src/assets/mixx.png" alt="Mixx by YAS" class="h-3 w-auto object-contain">
            </div>
            <span class="text-black text-xs">Mixx by YAS</span>
          </div>

          <!-- PayGate -->
          <!-- <div class="flex items-center space-x-2">
            <div class="bg-white rounded p-0.5 shadow-sm">
              <div class="text-gray-700 font-medium text-xs">PayGate</div>
            </div>
            <span class="text-gray-300 text-xs">PayGate</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="bg-gray-800 py-4">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-300">
        <p>&copy; 2025 Touche de Séduction. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'
import { contactService } from '../../config/api.js'

export default {
  name: 'Footer',
  setup() {
    const contactInfo = ref({
      lien_facebook: '',
      lien_insta: '',
      lien_x: '',
      lien_tiktok: ''
    })

    const fetchContactInfo = async () => {
      try {
        // Récupérer le premier contact (ID 1) qui contient les informations du site
        const response = await contactService.getContact(1)
        if (response.data.success) {
          contactInfo.value = response.data.data
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de contact:', error)
      }
    }

    onMounted(() => {
      fetchContactInfo()
    })

    return {
      contactInfo
    }
  }
}
</script>