// Configuration centralisée des menus admin
export const adminMenu = [
    { 
        name: 'Tableau de Bord', 
        route: '/admin/dashboard', 
        icon: 'fas fa-tachometer-alt',
        hasSubmenu: false,
        component: 'Dashboard'
    },
    { 
        name: 'Analytics', 
        route: '/admin/analytics', 
        icon: 'fas fa-chart-line',
        hasSubmenu: false,
        component: 'Analytics'
    },
    { 
        name: 'Gestion', 
        route: '#', 
        icon: 'fas fa-cogs',
        hasSubmenu: true,
        submenu: [
            { 
                name: 'Utilisateurs', 
                route: '/admin/users', 
                icon: 'fas fa-users',
                component: 'User'
            },
        ]
    },
    { 
        name: 'Articles', 
        route: '#', 
        icon: 'fas fa-box',
        hasSubmenu: true,
        submenu: [
            { 
                name: 'Liste des Produits', 
                route: '/admin/article/produit', 
                icon: 'fas fa-list',
                component: 'Produit'
            },
            { 
                name: 'Catégories', 
                route: '/admin/produits/category', 
                icon: 'fas fa-tags',
                component: 'Categories'
            },
            { 
                name: 'Livraison', 
                route: '/admin/article/livraison', 
                icon: 'fas fa-truck',
                component: 'Shipping'
            }
        ]
    },
    { 
        name: 'Commandes', 
        route: '#', 
        icon: 'fas fa-shopping-bag',
        hasSubmenu: true,
        submenu: [
            { 
                name: 'Liste des Commandes', 
                route: '/admin/orders', 
                icon: 'fas fa-clock',
                component: 'Orders'
            },
            { 
                name: 'Paiement', 
                route: '/admin/orders/paiement', 
                icon: 'fas fa-credit-card',
                component: 'Paiement'
            },
            /* { 
                name: 'Livrées', 
                route: '/admin/orders/delivered', 
                icon: 'fas fa-check-circle',
                component: 'DeliveredOrders'
            },
            { 
                name: 'Retours', 
                route: '/admin/orders/returns', 
                icon: 'fas fa-undo',
                component: 'Returns'
            } */
        ]
    },
   
];

// Fonction pour obtenir le menu actif basé sur la route
export function getActiveMenu(currentRoute) {
    for (const item of adminMenu) {
        if (item.route === currentRoute) {
            return item;
        }
        if (item.hasSubmenu && item.submenu) {
            for (const subItem of item.submenu) {
                if (subItem.route === currentRoute) {
                    return subItem;
                }
            }
        }
    }
    return null;
}

// Fonction pour obtenir tous les items de menu (aplatis)
export function getAllMenuItems() {
    const items = [];
    for (const item of adminMenu) {
        if (item.hasSubmenu && item.submenu) {
            items.push(...item.submenu);
        } else {
            items.push(item);
        }
    }
    return items;
}

// Fonction pour obtenir le composant par route
export function getComponentByRoute(route) {
    const item = getActiveMenu(route);
    return item ? item.component : null;
} 