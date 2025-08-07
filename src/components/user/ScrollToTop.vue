<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button 
      v-if="showScrollTopButton" 
      @click="scrollToTop" 
      class="fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-hover-color hover:scale-110 flex items-center justify-center z-50 cursor-pointer transition-all duration-300"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollTopButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollTopButton.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
