<template>
    <header class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b-4 border-indigo-600">
        <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Mobile menu button -->
            <button @click="$emit('toggle-sidebar')" class="text-gray-500 focus:outline-none lg:hidden">
                <i class="fas fa-bars text-xl sm:text-2xl"></i>
            </button>
            <!-- Desktop sidebar toggle button -->
            <button @click="$emit('toggle-sidebar')" class="hidden lg:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-lg sm:text-xl"></i>
            </button>
            <div class="relative flex-1 max-w-xs sm:max-w-md">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i class="fas fa-search text-gray-500 text-sm sm:text-base"></i>
                </span>
                <input
                    class="w-full pl-8 sm:pl-10 pr-4 py-2 text-sm sm:text-base text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    type="text" placeholder="Rechercher">
            </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-4">
            <button class="flex text-gray-600 focus:outline-none p-2 hover:bg-gray-100 rounded-lg relative">
                <i class="fas fa-bell text-lg sm:text-xl"></i>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            <div class="relative">
                <button @click="profileDropdownOpen = !profileDropdownOpen" class="relative block w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full shadow focus:outline-none">
                    <img class="object-cover w-full h-full" src="https://placehold.co/40x40/6366f1/white?text=A"
                        alt="Your avatar">
                </button>
                
                <!-- Profile Dropdown -->
                <div v-if="profileDropdownOpen" @click.away="profileDropdownOpen = false" 
                     class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div class="px-4 py-2 border-b border-gray-100">
                        <p class="text-sm font-medium text-gray-900">{{ userInfo?.name || 'Admin User' }}</p>
                        <p class="text-xs text-gray-500">{{ userInfo?.email || 'admin@example.com' }}</p>
                    </div>
                    <a href="/admin/settings/profil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-user mr-2"></i>Profil
                    </a>
                    <a href="/admin/settings/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-cog mr-2"></i>Paramètres
                    </a>
                    <div class="border-t border-gray-100"></div>
                    <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <i class="fas fa-sign-out-alt mr-2"></i>Déconnexion
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../config/auth.js'

export default {
    name: 'Navbar',
    props: {
        sidebarOpen: {
            type: Boolean,
            required: true
        }
    },
    emits: ['toggle-sidebar'],
    setup() {
        const router = useRouter()
        const profileDropdownOpen = ref(false)

        // Récupérer les informations utilisateur
        const userInfo = computed(() => {
            return authService.getUserInfo()
        })

        // Fonction de déconnexion
        const handleLogout = () => {
            authService.logout()
            profileDropdownOpen.value = false
            router.push('/auth/login')
        }

        return {
            profileDropdownOpen,
            userInfo,
            handleLogout
        }
    }
}
</script> 