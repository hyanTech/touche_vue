# Intégration API Catégories

## Vue d'ensemble

Cette implémentation permet d'intégrer l'API `/categories/active` pour afficher dynamiquement les catégories dans le navbar et sur la page d'accueil.

## Modifications apportées

### 1. Configuration API (`src/config/api.js`)

Ajout du service pour récupérer les catégories actives :

```javascript
// Récupérer les catégories actives
getActiveCategories: () => {
    return apiClient.get('/categories/active')
},
```

### 2. Configuration Menu (`src/config/menu.js`)

- Ajout des fonctions `fetchActiveCategories()` et `fetchHomeCategories()`
- Modification du menu principal pour utiliser des catégories dynamiques
- Ajout d'une fonction `getCategoryColor()` pour les couleurs des catégories

### 3. Composant CategoryManager (`src/components/CategoryManager.vue`)

Nouveau composant réutilisable qui :
- Gère le chargement des catégories depuis l'API
- Fournit des états de chargement et d'erreur
- Supporte deux types : 'menu' et 'home'
- Utilise des slots pour l'affichage personnalisé

### 4. Navbar (`src/components/user/navbar.vue`)

- Intégration de l'API pour charger les catégories dynamiquement
- Mise à jour du menu avec les catégories récupérées
- Gestion des erreurs de chargement

### 5. Page d'accueil (`src/user/Home.vue`)

- Utilisation du composant CategoryManager
- Affichage des états de chargement et d'erreur
- Interface utilisateur améliorée avec des indicateurs visuels

## Structure des données attendues

L'API `/categories/active` doit retourner un objet avec la structure suivante :

```javascript
{
  "success": true,
  "data": [
    {
      "id": 9,
      "nom": "Parfum",
      "description": "Des parfums de qualités a bas prix",
      "icone": "fas fa-gift",
      "status": true,
      "created_at": "2025-07-30T10:27:18.000Z",
      "updated_at": "2025-08-01T09:15:33.000Z"
    }
  ]
}
```

### Propriétés des catégories :
- `id` : Identifiant unique de la catégorie
- `nom` : Nom de la catégorie
- `description` : Description de la catégorie
- `icone` : Classe CSS de l'icône FontAwesome (optionnel)
- `status` : Statut actif/inactif de la catégorie
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

## Utilisation

### Dans le navbar
Les catégories sont automatiquement chargées et affichées dans le menu déroulant "Categories".

### Sur la page d'accueil
Les catégories sont affichées dans la section "Nos Catégories" avec :
- Un indicateur de chargement
- Gestion des erreurs
- Affichage des icônes et couleurs

## Gestion des erreurs

- En cas d'erreur de l'API, les catégories statiques sont utilisées comme fallback
- Les erreurs sont loggées dans la console pour le débogage
- L'interface utilisateur affiche des messages d'erreur appropriés

## Avantages

1. **Dynamique** : Les catégories sont récupérées depuis l'API en temps réel
2. **Réutilisable** : Le composant CategoryManager peut être utilisé partout
3. **Robuste** : Gestion des erreurs et fallback vers les données statiques
4. **Performant** : Chargement asynchrone sans bloquer l'interface
5. **Maintenable** : Code modulaire et bien structuré 