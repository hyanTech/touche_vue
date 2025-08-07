<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
        <i class="fas fa-user text-indigo-600"></i>
      </div>
      <div>
        <h3 class="text-sm font-medium text-gray-900">
          {{ userInfo?.name || 'Utilisateur Admin' }}
        </h3>
        <p class="text-xs text-gray-500">
          {{ userInfo?.email || 'admin@example.com' }}
        </p>
        <p class="text-xs text-gray-400">
          Connecté le {{ formatDate(loginTime) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { authService } from '../../config/auth.js'

export default {
  name: 'UserInfo',
  setup() {
    const loginTime = ref(new Date())

    const userInfo = computed(() => {
      return authService.getUserInfo()
    })

    const formatDate = (date) => {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }

    return {
      userInfo,
      loginTime,
      formatDate
    }
  }
}
</script> 