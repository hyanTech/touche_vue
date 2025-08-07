<template>
  <div v-if="isOpen" class="fixed inset-0 z-[9999] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Overlay avec effet blur -->
    <div class="flex items-center justify-center min-h-screen px-4 py-6">
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
        aria-hidden="true"
        @click="handleOverlayClick"
      ></div>

             <!-- Modal centré avec animation -->
       <div class="relative bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-out max-w-sm w-full mx-auto z-[10000]">
                 <div class="p-4">
           <div class="flex items-center justify-center mb-3">
             <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-red-100 to-pink-100">
               <svg class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
               </svg>
             </div>
           </div>
           <div class="text-center">
             <h3 class="text-lg font-semibold text-gray-900 mb-2" id="modal-title">
               {{ title }}
             </h3>
             <div class="mb-4">
               <p class="text-sm text-gray-600 leading-relaxed">
                 {{ message }}
               </p>
             </div>
           </div>
         </div>
                 <div class="bg-gray-50 px-4 py-3 rounded-b-xl">
           <div class="flex flex-col sm:flex-row gap-2">
             <button
               type="button"
               class="flex-1 inline-flex justify-center items-center rounded-lg border border-gray-300 px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:shadow-md"
               @click="cancelDelete"
               :disabled="isLoading"
             >
               Annuler
             </button>
             <button
               type="button"
               class="flex-1 inline-flex justify-center items-center rounded-lg border border-transparent px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-sm font-medium text-white hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 hover:shadow-lg"
               @click="confirmDelete"
               :disabled="isLoading"
             >
               <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               {{ isLoading ? 'Suppression...' : 'Supprimer' }}
             </button>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'DeleteConfirmationModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirmer la suppression'
    },
    message: {
      type: String,
      default: 'Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    
    
    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget && !props.isLoading) {
        emit('cancel')
      }
    }

    const confirmDelete = () => {
      if (!props.isLoading) {
        emit('confirm')
      }
    }

    const cancelDelete = () => {
      if (!props.isLoading) {
        emit('cancel')
      }
    }

    // Fermer le modal avec la touche Escape
    const handleEscape = (event) => {
      if (event.key === 'Escape' && props.isOpen && !props.isLoading) {
        emit('cancel')
      }
    }

    // Ajouter/supprimer l'écouteur d'événement
    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      } else {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    })

    return {
      handleOverlayClick,
      confirmDelete,
      cancelDelete
    }
  }
}
</script> 