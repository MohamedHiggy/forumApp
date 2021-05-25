<template>
    <the-heading />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading.vue'
export default {
  name: 'App',
  components: { TheHeading }
}
</script>

<style>
@import './assets/style.css';
</style>
