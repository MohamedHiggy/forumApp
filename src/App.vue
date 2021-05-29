<template>
  <the-heading />
  <div class="container">
    <router-view v-show="showPage" @ready="onPageReady"/>
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading.vue'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'App',
  components: { TheHeading },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.fetchAuthUser()
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  }
}
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar{
  background: #57AD8D !important;
}
</style>
