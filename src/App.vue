<script setup>
import NotificationContainer from './components/NotificationContainer.vue'
// App principal avec routeur
</script>

<template>
  <div id="app">
    <router-view />
    <NotificationContainer />
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
