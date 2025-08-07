<template>
    <div id="app" class="flex h-screen bg-gray-200">
        <!-- Sidebar Component -->
        <Sidebar 
            :sidebar-open="sidebarOpen" 
            :menu-items="menuItems"
            :current-route="currentRoute"
            @close-sidebar="closeSidebar" 
        />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden main-content" :class="sidebarOpen ? 'sidebar-open' : ''">
            <!-- Navbar Component -->
            <Navbar 
                :sidebar-open="sidebarOpen" 
                @toggle-sidebar="toggleSidebar" 
            />

            <!-- Dynamic Content Area -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
                <div class="container mx-auto">
                    
                    <!-- Dynamic Content -->
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/admin/Sidebar.vue'
import Navbar from '../components/admin/Navbar.vue'
import { adminMenu, getActiveMenu } from '../config/adminMenu.js'

export default {
    name: 'AdminLayout',
    components: {
        Sidebar,
        Navbar
    },
    props: {
        pageTitle: {
            type: String,
            default: 'Page Admin'
        },
    },
    setup() {
        const route = useRoute();
        
        // State for sidebar visibility
        const sidebarOpen = ref(false);

        // Computed properties
        const currentRoute = computed(() => route.path);
        const menuItems = computed(() => adminMenu);
        const activeMenu = computed(() => getActiveMenu(currentRoute.value));

        // Function to toggle sidebar
        const toggleSidebar = () => {
            sidebarOpen.value = !sidebarOpen.value;
        };

        // Function to close sidebar
        const closeSidebar = () => {
            sidebarOpen.value = false;
        };

        // Function to handle window resize for responsive sidebar
        const handleResize = () => {
            if (window.innerWidth < 1024) { // lg breakpoint in Tailwind
                sidebarOpen.value = false;
            } else {
                // On desktop (lg and above), sidebar is open by default
                sidebarOpen.value = true;
            }
        };

        // Set initial state and add resize listener on component mount
        onMounted(() => {
            handleResize(); // Set initial state based on screen size
            window.addEventListener('resize', handleResize);
        });

        return {
            sidebarOpen,
            menuItems,
            currentRoute,
            activeMenu,
            toggleSidebar,
            closeSidebar
        };
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