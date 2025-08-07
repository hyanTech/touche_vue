// Utilitaires pour la gestion des images
export const getImageUrl = (filename) => {
  if (!filename) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkMxMiAxNC44OTU0IDEyLjg5NTQgMTQgMTQgMTRIMjZDMjcuMTA0NiAxNCAyOCAxNC44OTU0IDI4IDE2VjI4QzI4IDI5LjEwNDYgMjcuMTA0NiAzMCAyNiAzMEgxNEMxMi44OTU0IDMwIDEyIDI5LjEwNDYgMTIgMjhWMTZaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xNiAyMkMxNiAyMC44OTU0IDE2Ljg5NTQgMjAgMTggMjBIMjJDMjMuMTA0NiAyMCAyNCAyMC44OTU0IDI0IDIyVjI2QzI0IDI3LjEwNDYgMjMuMTA0NiAyOCAyMiAyOEgxOEMxNi44OTU0IDI4IDE2IDI3LjEwNDYgMTYgMjZWMjJaIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo='
  
  // Si c'est déjà une URL complète, l'utiliser directement
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename
  }
  
  // Sinon, construire l'URL avec le proxy Vite
  return `/api/files/products/${filename}`
}

// Fonction pour gérer les erreurs d'images
export const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkMxMiAxNC44OTU0IDEyLjg5NTQgMTQgMTQgMTRIMjZDMjcuMTA0NiAxNCAyOCAxNC44OTU0IDI4IDE2VjI4QzI4IDI5LjEwNDYgMjcuMTA0NiAzMCAyNiAzMEgxNEMxMi44OTU0IDMwIDEyIDI5LjEwNDYgMTIgMjhWMTZaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xNiAyMkMxNiAyMC44OTU0IDE2Ljg5NTQgMjAgMTggMjBIMjJDMjMuMTA0NiAyMCAyNCAyMC44OTU0IDI0IDIyVjI2QzI0IDI3LjEwNDYgMjMuMTA0NiAyOCAyMiAyOEgxOEMxNi44OTU0IDI4IDE2IDI3LjEwNDYgMTYgMjZWMjJaIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo='
}

// Fonction pour formater les prix
export const formatPrice = (price) => {
  if (!price) return '0'
  // Convertir en nombre et formater avec des espaces pour les milliers
  const numPrice = parseFloat(price)
  return numPrice.toLocaleString('fr-FR')
}

// Fonction pour formater les prix avec décimales
export const formatPriceWithDecimals = (price) => {
  if (!price) return '0.00'
  return parseFloat(price).toFixed(2)
}

// Fonction pour obtenir le statut du stock
export const getStockStatusText = (stock) => {
  if (stock <= 0) return 'Rupture de stock'
  if (stock <= 5) return 'Stock faible'
  return 'En stock'
}

// Fonction pour obtenir la classe CSS du statut du stock
export const getStockStatusClass = (stock) => {
  if (stock <= 0) return 'bg-red-100 text-red-800'
  if (stock <= 5) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
} 