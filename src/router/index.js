import { createRouter, createWebHistory } from 'vue-router'
import Home from '../user/Home.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminDash from '../admin/dash.vue'
import AdminCategories from '../admin/article/category/category.vue'
import AddCategory from '../admin/article/category/add_category.vue'
import EditCategory from '../admin/article/category/edit_category.vue'
import Produit from '../admin/article/produit/produit.vue'
import AddProduit from '../admin/article/produit/add_produit.vue'
import Shipping from '../admin/article/livraison/livraison.vue'
import AddShipping from '../admin/article/livraison/add_livraison.vue'
import EditShipping from '../admin/article/livraison/edit_livraison.vue'
import DetailsProduit from '../user/details_produit.vue'
import InfoPage from '../user/info_page.vue'
import ProduitView from '../user/produit.vue'
import ProduitCat from '../user/produit_cat.vue'
import Category from '../user/category.vue'
import Contact from '../user/contact.vue'
import NotFound from '../user/NotFound.vue'
import PayConfirm from '../user/pay_confirm.vue'
import ThanksOrder from '../user/thanks_order.vue'
import EditProduit from '../admin/article/produit/edit_produit.vue'
import Orders from '../admin/orders/orders.vue'
import Paiement from '../admin/orders/paiement.vue'
import Login from '../admin/auth/login.vue'
import DetailOrder from '../admin/orders/detail_order.vue'
import { requireAuth, authService } from '../config/auth.js'
import Profil from '../admin/settings/profil.vue'
import User from '../admin/user/user.vue'
import UserCreate from '../admin/user/user_create.vue'
import Settings from '../admin/settings/settings.vue'
import Notifications from '../admin/settings/Notifications.vue'
import Newsletters from '../admin/settings/Newsletters.vue'
import SiteInfo from '../admin/settings/SiteInfo.vue'
import Contact_Admin from '../admin/settings/contact.vue'
import PrivacyPolicy from '../admin/settings/PrivacyPolicy.vue'
import LegalMentions from '../admin/settings/LegalMentions.vue'
import Pub from '../admin/settings/pub/pub.vue'
import EditPub from '../admin/settings/pub/edit_pub.vue'
import CreatePub from '../admin/settings/pub/create_pub.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produits',
    name: 'ProduitView',
    component: ProduitView
  },
  {
    path: '/categories',
    name: 'Category',
    component: Category
  },
  {
    path: '/produits/category/:id',
    name: 'ProduitCat',
    component: ProduitCat
  },
  {
    path: '/details_produit/:id?',
    name: 'DetailsProduit',
    component: DetailsProduit
  },
  {
    path: '/info',
    name: 'InfoPage',
    component: InfoPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/pay_confirm',
    name: 'PayConfirm',
    component: PayConfirm
  },
  {
    path: '/thanks_order',
    name: 'ThanksOrder',
    component: ThanksOrder
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminRedirect',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDash',
        component: AdminDash,
        meta: { requiresAuth: true }
      },
      {
        path: 'produits/category',
        name: 'AdminCategories',
        component: AdminCategories,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/add_category',
        name: 'AddCategory',
        component: AddCategory,
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'User',
        component: User,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/produit',
        name: 'Produit',
        component: Produit,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/add_produit',
        name: 'AddProduit',
        component: AddProduit,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/edit_category/:id',
        name: 'EditCategory',
        component: EditCategory,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/livraison',
        name: 'Shipping',
        component: Shipping,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/add_livraison',
        name: 'AddShipping',
        component: AddShipping,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/edit_livraison/:id',
        name: 'EditShipping',
        component: EditShipping,
        meta: { requiresAuth: true }
      },
      {
        path: 'article/edit_produit/:id',
        name: 'EditProduit',
        component: EditProduit,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders/detail_order/:id',
        name: 'DetailOrder',
        component: DetailOrder,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders/paiement',
        name: 'Paiement',
        component: Paiement,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/profil',
        name: 'Profil',
        component: Profil,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true }
      },
      {
        path: 'user/create',
        name: 'UserCreate',
        component: UserCreate,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/notifications',
        name: 'Notifications',
        component: Notifications,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/newsletters',
        name: 'Newsletters',
        component: Newsletters,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/site-info',
        name: 'SiteInfo',
        component: SiteInfo,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/contact',
        name: 'Contact_Admin',
        component: Contact_Admin,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/privacy-policy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/legal-mentions',
        name: 'LegalMentions',
        component: LegalMentions,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/pub',
        name: 'Pub',
        component: Pub,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/edit_pub/:id',
        name: 'EditPub',
        component: EditPub,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings/pub/create',
        name: 'CreatePub',
        component: CreatePub,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global pour vérifier l'authentification sur toutes les routes
router.beforeEach(async (to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth || to.path.startsWith('/admin')) {
    try {
      const isAuthenticated = await authService.isAuthenticated()
      
      if (!isAuthenticated) {
        // Rediriger vers la page de connexion si non authentifié
        next({ name: 'Login' })
        return
      }
      
      // Passer les informations utilisateur à la route
      to.meta.userInfo = authService.getUserInfo()
    } catch (error) {
      console.error('Erreur lors de la vérification d\'authentification:', error)
      authService.logout()
      next({ name: 'Login' })
      return
    }
  }
  
  next()
})

export default router 