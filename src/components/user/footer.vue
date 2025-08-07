<template>
  <footer class="bg-secondary text-text-primary mt-12 pt-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Newsletter -->
      <div class="bg-white/50 rounded-lg p-8 md:p-12 text-center mb-12">
        <h3 class="text-3xl font-bold mb-2 text-text-primary">Rejoignez notre communauté</h3>
        <p class="text-text-secondary mb-6 max-w-2xl mx-auto">Inscrivez-vous à notre newsletter pour recevoir les dernières tendances, des offres exclusives et -10% sur votre première commande.</p>
        <form class="flex flex-col sm:flex-row max-w-md mx-auto">
          <input type="email" placeholder="Votre adresse email" class="w-full sm:w-2/3 rounded-md sm:rounded-r-none px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary mb-2 sm:mb-0">
          <button class="w-full sm:w-1/3 bg-primary hover:bg-hover-color rounded-md sm:rounded-l-none px-4 py-3 transition cursor-pointer font-semibold">S'inscrire</button>
        </form>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
        <div>
          <div class="flex items-center mb-4">
            <img src="/src/assets/logo.png" alt="Logo" class="h-28 w-auto">
          </div>
          <p class="text-text-secondary">La mode à portée de clic. Qualité et style pour tous.</p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-text-secondary hover:text-text-primary"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-text-secondary hover:text-text-primary"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-text-secondary hover:text-text-primary"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-text-secondary hover:text-text-primary"><i class="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4 text-text-primary">Liens Rapides</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">À propos</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Contact</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">FAQ</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Suivi de commande</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4 text-text-primary">Catégories</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Hommes</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Femmes</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Enfants</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Accessoires</a></li>
          </ul>
        </div>
        <div>
           <h3 class="text-lg font-semibold mb-4 text-text-primary">Service Client</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Livraison & Retours</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Guide des tailles</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Politique de confidentialité</a></li>
            <li><a href="#" class="text-text-secondary hover:text-text-primary transition cursor-pointer">Termes & Conditions</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-gray-800 py-4">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-300">
        <p>&copy; 2025 Touché de Séduction. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>