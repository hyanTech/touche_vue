<template>
    
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-4 sm:gap-6 mt-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="p-2 sm:p-3 bg-indigo-500 rounded-full">
                        <i class="fas fa-shopping-cart text-white text-sm sm:text-base"></i>
                    </div>
                    <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-500">Ventes Totales</p>
                        <p class="text-lg sm:text-2xl font-bold text-gray-800">1,257</p>
                    </div>
                </div>
            </div>
            <div class="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="p-2 sm:p-3 bg-green-500 rounded-full">
                        <i class="fas fa-users text-white text-sm sm:text-base"></i>
                    </div>
                    <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-500">Nouveaux Utilisateurs</p>
                        <p class="text-lg sm:text-2xl font-bold text-gray-800">82</p>
                    </div>
                </div>
            </div>
            <div class="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="p-2 sm:p-3 bg-yellow-500 rounded-full">
                        <i class="fas fa-box-open text-white text-sm sm:text-base"></i>
                    </div>
                    <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-500">Commandes en Attente</p>
                        <p class="text-lg sm:text-2xl font-bold text-gray-800">43</p>
                    </div>
                </div>
            </div>
            <div class="p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="p-2 sm:p-3 bg-red-500 rounded-full">
                        <i class="fas fa-server text-white text-sm sm:text-base"></i>
                    </div>
                    <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-500">Charge Serveur</p>
                        <p class="text-lg sm:text-2xl font-bold text-gray-800">34%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities Table -->
        <div class="mt-6 sm:mt-8 bg-white rounded-lg shadow-md">
            <div class="p-4 border-b">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Activités Récentes</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Utilisateur</th>
                            <th
                                class="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action</th>
                            <th
                                class="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date</th>
                            <th
                                class="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">Alice Martin</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">A mis à jour le profil</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Il y a 2 minutes
                            </td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Succès
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">Bob Dupont</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">A ajouté un nouveau produit</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Il y a 15 minutes
                            </td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Succès
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">Charlie Durand</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">Tentative de connexion échouée</td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Il y a 1 heure
                            </td>
                            <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Échec
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue'

export default {
    name: 'Dashboard',
    components: {
        AdminLayout
    }
}
</script>

<style>
/* Custom scrollbar for a cleaner look */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Ensure main content doesn't overlap with sidebar on desktop */
@media (min-width: 1024px) {
    .main-content {
        margin-left: 16rem; /* Default sidebar open on desktop */
        transition: margin-left 0.3s ease-in-out;
    }
    
    .main-content.sidebar-open {
        margin-left: 16rem; /* 256px = w-64 on desktop */
    }
    
    .main-content:not(.sidebar-open) {
        margin-left: 0; /* When sidebar is closed */
    }
}

@media (min-width: 640px) {
    .main-content.sidebar-open {
        margin-left: 16rem; /* 256px = w-64 on sm and above */
    }
}

/* Mobile-first responsive design */
@media (max-width: 639px) {
    .main-content.sidebar-open {
        margin-left: 14rem;
    }
}
</style>