import { ref } from 'vue'

// État global des notifications
const notifications = ref([])
let notificationId = 0

// Types de notifications
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
}

// Service de notification
export const notificationService = {
    // Ajouter une notification
    add(notification) {
        const id = ++notificationId
        const newNotification = {
            id,
            type: notification.type || NOTIFICATION_TYPES.INFO,
            title: notification.title || '',
            message: notification.message || '',
            duration: notification.duration || 5000, // 5 secondes par défaut
            autoClose: notification.autoClose !== false, // Fermeture automatique par défaut
            createdAt: Date.now(),
            ...notification
        }

        notifications.value.push(newNotification)

        // Fermeture automatique
        if (newNotification.autoClose && newNotification.duration > 0) {
            setTimeout(() => {
                notificationService.remove(id)
            }, newNotification.duration)
        }

        return id
    },

    // Supprimer une notification
    remove(id) {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
        }
    },

    // Méthodes utilitaires
    success(message, title = 'Succès', options = {}) {
        return notificationService.add({
            type: NOTIFICATION_TYPES.SUCCESS,
            title,
            message,
            ...options
        })
    },

    error(message, title = 'Erreur', options = {}) {
        return notificationService.add({
            type: NOTIFICATION_TYPES.ERROR,
            title,
            message,
            duration: 8000, // Plus long pour les erreurs
            ...options
        })
    },

    warning(message, title = 'Attention', options = {}) {
        return notificationService.add({
            type: NOTIFICATION_TYPES.WARNING,
            title,
            message,
            ...options
        })
    },

    info(message, title = 'Information', options = {}) {
        return notificationService.add({
            type: NOTIFICATION_TYPES.INFO,
            title,
            message,
            ...options
        })
    },

    // Vider toutes les notifications
    clear() {
        notifications.value = []
    }
}

// Composable pour utiliser les notifications
export function useNotification() {
    return {
        notifications: notifications,
        add: notificationService.add,
        remove: notificationService.remove,
        success: notificationService.success,
        error: notificationService.error,
        warning: notificationService.warning,
        info: notificationService.info,
        clear: notificationService.clear
    }
} 