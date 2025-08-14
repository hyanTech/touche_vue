// Configuration du menu principal
import { categoryService } from './api.js';

// Fonction pour récupérer les catégories actives limitées depuis l'API
export const fetchActiveCategories = async () => {
  try {
    const response = await categoryService.getActiveCategories();
    // Vérifier que la réponse a la structure attendue
    if (response.data && response.data.success && response.data.data) {
      return response.data.data.map(category => ({
        id: category.id,
        name: category.nom,
        href: `/produits/category/${category.id}/${encodeURIComponent(category.nom)}`,
        icon: category.icone || 'fa-solid fa-tag',
        description: category.description
      }));
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    // Retourner un tableau vide en cas d'erreur pour éviter les crashs
    return [];
  }
};

// Fonction pour récupérer toutes les catégories actives depuis l'API
export const fetchAllActiveCategories = async () => {
  try {
    const response = await categoryService.getAllActiveCategories();
    // Vérifier que la réponse a la structure attendue
    if (response.data && response.data.success && response.data.data) {
      return response.data.data.map((category, index) => ({
        id: category.id,
        name: category.nom,
        icon: category.icone || 'fa-solid fa-tag',
        href: `/produits/category/${category.id}`,
        color: `bg-${getCategoryColor(index)}`
      }));
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};

// Fonction pour récupérer les catégories pour la page d'accueil
export const fetchHomeCategories = async () => {
  try {
    const response = await categoryService.getActiveCategories();
    // Vérifier que la réponse a la structure attendue
    if (response.data && response.data.success && response.data.data) {
      return response.data.data.map((category, index) => ({
        id: category.id,
        name: category.nom,
        icon: category.icone || 'fa-solid fa-tag',
        href: `/produits/category/${category.id}/${category.nom}`,
        color: `bg-${getCategoryColor(index)}`
      }));
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};

// Fonction pour obtenir une couleur basée sur l'index
const getCategoryColor = (index) => {
  const colors = ['blue-500', 'green-500', 'purple-500', 'red-500', 'pink-500', 'yellow-500', 'indigo-500', 'teal-500'];
  return colors[index % colors.length];
};

export const mainMenu = [
  {
    name: 'Nos produits',
    href: '/produits',
    icon: 'fa-solid fa-shop',
    /* badge: 'Nouveau' */
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: 'fa-solid fa-tags',
    sublinks: [] // Sera rempli dynamiquement
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: 'fa-solid fa-phone',
    
  }
  
  
  
 
];

// Configuration des catégories pour la page d'accueil (fallback statique)
export const homeCategories = [
  {
    id: 1,
    name: 'T-shirts',
    icon: 'fa-solid fa-shirt',
    href: '/hommes/t-shirts',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Pantalons',
    icon: 'fa-solid fa-person-military-pointing',
    href: '/hommes/pantalons',
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Chaussures',
    icon: 'fa-solid fa-shoe-prints',
    href: '/chaussures',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Vestes',
    icon: 'fa-solid fa-user-secret',
    href: '/vestes',
    color: 'bg-red-500'
  },
  {
    id: 5,
    name: 'Robes',
    icon: 'fa-solid fa-person-dress',
    href: '/femmes/robes',
    color: 'bg-pink-500'
  },
  {
    id: 6,
    name: 'Accessoires',
    icon: 'fa-solid fa-hat-wizard',
    href: '/accessoires',
    color: 'bg-yellow-500'
  }
];

// Configuration du menu mobile
export const mobileMenu = [
  {
    name: 'Accueil',
    href: '/',
    icon: 'fa-solid fa-home'
  },
  {
    name: 'Produits',
    href: '/produits',
    icon: 'fa-solid fa-shop'
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: 'fa-solid fa-tags',
    sublinks: [] // Sera rempli dynamiquement
  },
 
  {
    name: 'Contact',
    href: '/contact',
    icon: 'fa-solid fa-phone',
  },
  
];

// Configuration du footer
export const footerLinks = {
  shopNow: {
    title: 'ShopNow',
    description: 'La mode à portée de clic. Qualité et style pour tous.',
    social: [
      { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
      { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
      { name: 'Twitter', icon: 'fab fa-twitter', href: '#' },
      { name: 'Pinterest', icon: 'fab fa-pinterest', href: '#' }
    ]
  },
  quickLinks: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Suivi de commande', href: '/suivi-commande' }
  ],
  categories: [
    { name: 'Hommes', href: '/hommes' },
    { name: 'Femmes', href: '/femmes' },
    { name: 'Enfants', href: '/enfants' },
    { name: 'Accessoires', href: '/accessoires' }
  ],
  customerService: [
    { name: 'Livraison & Retours', href: '/livraison-retours' },
    { name: 'Guide des tailles', href: '/guide-tailles' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Termes & Conditions', href: '/termes-conditions' }
  ]
};

export default {
  mainMenu,
  homeCategories,
  mobileMenu,
  footerLinks
}; 