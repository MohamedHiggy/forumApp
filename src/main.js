/* eslint-disable indent */
/* eslint-disable eol-last */
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const forumApp = createApp(App)
forumApp.use(router)
forumApp.mount('#app')