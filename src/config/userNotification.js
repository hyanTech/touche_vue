import { ref } from 'vue';

// État global des notifications utilisateur
const userNotifications = ref([]);

export const useUserNotification = () => {
  // Ajouter une notification
  const addNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };
    
    userNotifications.value.push(notification);
    
    // Supprimer automatiquement après la durée spécifiée
    setTimeout(() => {
      removeNotification(id);
    }, duration);
    
    return id;
  };

  // Supprimer une notification
  const removeNotification = (id) => {
    const index = userNotifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      userNotifications.value.splice(index, 1);
    }
  };

  // Notifications prédéfinies
  const showSuccess = (message, duration = 3000) => {
    return addNotification(message, 'success', duration);
  };

  const showError = (message, duration = 5000) => {
    return addNotification(message, 'error', duration);
  };

  const showWarning = (message, duration = 4000) => {
    return addNotification(message, 'warning', duration);
  };

  const showInfo = (message, duration = 3000) => {
    return addNotification(message, 'info', duration);
  };

  return {
    notifications: userNotifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}; 