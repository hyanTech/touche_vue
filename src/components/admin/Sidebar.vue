<template>
    <!-- Overlay for mobile -->
    <div v-if="sidebarOpen" @click="closeSidebar" 
         class="fixed inset-0 bg-black bg-opacity-5 z-20 lg:hidden transition-opacity duration-300"></div>
    
    <!-- Sidebar -->
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        class="sidebar fixed inset-y-0 left-0 z-30 w-56 sm:w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl">

        <!-- Logo -->
        <div class="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700">
            <div class="flex items-center">
                <i class="fas fa-rocket text-xl sm:text-2xl text-indigo-400"></i>
                <span class="mx-2 sm:mx-3 text-base sm:text-lg font-semibold">Admin Panel</span>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="mt-4 sm:mt-6 px-2 sm:px-4 flex flex-col h-full">
            <div class="flex-1">
                <div v-for="item in menuItems" :key="item.name">
                    <!-- Main menu item -->
                    <div class="relative">
                        <router-link v-if="!item.hasSubmenu" :to="item.route" 
                            :class="[
                                'flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 mt-1 sm:mt-2 duration-200 border-l-4 rounded-r-lg text-xs sm:text-sm',
                                isActive(item.route)
                                    ? 'bg-gray-700 border-indigo-400'
                                    : 'border-gray-900 hover:bg-gray-700'
                            ]">
                            <div class="flex items-center">
                                <i :class="item.icon + ' text-xs sm:text-sm'"></i>
                                <span class="mx-2 sm:mx-3">{{ item.name }}</span>
                            </div>
                        </router-link>
                        
                        <!-- Menu item with submenu -->
                        <div v-else>
                            <button @click="toggleSubmenu(item.name)"
                                :class="[
                                    'w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 mt-1 sm:mt-2 duration-200 border-l-4 rounded-r-lg text-xs sm:text-sm text-left',
                                    isParentActive(item)
                                        ? 'bg-gray-700 border-indigo-400'
                                        : 'border-gray-900 hover:bg-gray-700'
                                ]">
                                <div class="flex items-center">
                                    <i :class="item.icon + ' text-xs sm:text-sm'"></i>
                                    <span class="mx-2 sm:mx-3">{{ item.name }}</span>
                                </div>
                                <i :class="[
                                    'fas fa-chevron-down text-xs transition-transform duration-200',
                                    expandedMenus.has(item.name) ? 'rotate-180' : ''
                                ]"></i>
                            </button>
                            
                            <!-- Submenu -->
                            <div v-if="expandedMenus.has(item.name)" 
                                 class="ml-4 mt-1 space-y-1 transition-all duration-200">
                                <router-link v-for="subItem in item.submenu" :key="subItem.name" 
                                   :to="subItem.route" 
                                   :class="[
                                       'flex items-center px-3 sm:px-6 py-2 sm:py-3 duration-200 border-l-4 rounded-r-lg text-xs sm:text-sm',
                                       isActive(subItem.route)
                                           ? 'bg-gray-600 border-indigo-400'
                                           : 'border-gray-800 hover:bg-gray-700'
                                   ]">
                                    <i :class="subItem.icon + ' text-xs sm:text-sm'"></i>
                                    <span class="mx-2 sm:mx-3">{{ subItem.name }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Separator after each section -->
                    <div v-if="item.name === 'Analytics' || item.name === 'Sécurité' || item.name === 'Stock' || item.name === 'Livraison' || item.name === 'Statistiques'" 
                         class="flex justify-center my-2">
                        <div class="w-16 h-px bg-gray-600"></div>
                    </div>
                </div>
            </div>
        </nav>
    </aside>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'Sidebar',
    props: {
        sidebarOpen: {
            type: Boolean,
            required: true
        },
        menuItems: {
            type: Array,
            required: true
        },
        currentRoute: {
            type: String,
            default: ''
        }
    },
    emits: ['close-sidebar'],
    setup(props, { emit }) {
        const route = useRoute();
        
        // State for submenu expansion
        const expandedMenus = ref(new Set());

        // Computed properties
        const currentPath = computed(() => route.path);

        // Function to check if a route is active
        const isActive = (menuRoute) => {
            return currentPath.value === menuRoute;
        };

        // Function to check if parent menu is active
        const isParentActive = (parentItem) => {
            if (!parentItem.submenu) return false;
            return parentItem.submenu.some(subItem => isActive(subItem.route));
        };

        // Function to close sidebar
        const closeSidebar = () => {
            emit('close-sidebar');
        };

        // Function to toggle submenu
        const toggleSubmenu = (menuName) => {
            if (expandedMenus.value.has(menuName)) {
                expandedMenus.value.delete(menuName);
            } else {
                expandedMenus.value.add(menuName);
            }
        };

        // Auto-expand parent menus when child is active
        const autoExpandParents = () => {
            for (const item of props.menuItems) {
                if (item.hasSubmenu && item.submenu) {
                    if (item.submenu.some(subItem => isActive(subItem.route))) {
                        expandedMenus.value.add(item.name);
                    }
                }
            }
        };

        // Watch for route changes and auto-expand parents
        const watchRoute = () => {
            autoExpandParents();
        };

        // Initialize
        watchRoute();

        return {
            expandedMenus,
            isActive,
            isParentActive,
            closeSidebar,
            toggleSubmenu
        };
    }
}
</script>

<style scoped>
/* Custom scrollbar for sidebar */
.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: #374151;
}

.sidebar::-webkit-scrollbar-thumb {
    background: #4B5563;
    border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
}

/* Simple transition for sidebar */
.sidebar {
    transition: transform 0.3s ease-in-out;
}
</style> 