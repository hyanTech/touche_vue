<template>
    <div class="fixed top-4 right-4 z-50 space-y-2">
        <TransitionGroup 
            name="notification" 
            tag="div" 
            class="space-y-2"
        >
            <div
                v-for="notification in notifications"
                :key="notification.id"
                :class="[
                    'max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300',
                    getNotificationClasses(notification.type)
                ]"
            >
                <div class="flex items-start">
                    <!-- Icône -->
                    <div class="flex-shrink-0 mr-3">
                        <i :class="getNotificationIcon(notification.type)" class="text-lg"></i>
                    </div>

                    <!-- Contenu -->
                    <div class="flex-1 min-w-0">
                        <div class="text-sm">
                            {{ notification.message }}
                        </div>
                    </div>

                    <!-- Bouton fermer -->
                    <div class="flex-shrink-0 ml-3">
                        <button
                            @click="removeNotification(notification.id)"
                            class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                        >
                            <i class="fas fa-times text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { useUserNotification } from '../config/userNotification.js'

const { notifications, removeNotification } = useUserNotification()

const getNotificationClasses = (type) => {
    const baseClasses = 'border-l-4'
    switch (type) {
        case 'success':
            return `${baseClasses} border-green-500 bg-green-50`
        case 'error':
            return `${baseClasses} border-red-500 bg-red-50`
        case 'warning':
            return `${baseClasses} border-yellow-500 bg-yellow-50`
        case 'info':
            return `${baseClasses} border-blue-500 bg-blue-50`
        default:
            return `${baseClasses} border-gray-500 bg-gray-50`
    }
}

const getNotificationIcon = (type) => {
    switch (type) {
        case 'success':
            return 'fas fa-check-circle text-green-500'
        case 'error':
            return 'fas fa-exclamation-circle text-red-500'
        case 'warning':
            return 'fas fa-exclamation-triangle text-yellow-500'
        case 'info':
            return 'fas fa-info-circle text-blue-500'
        default:
            return 'fas fa-info-circle text-gray-500'
    }
}
</script>

<style scoped>
/* Animations pour les notifications */
.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
}

.notification-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
}

.notification-move {
    transition: transform 0.3s ease;
}
</style> 