/* eslint-disable indent */
/* eslint-disable eol-last */
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import BaseDate from '@/components/BaseData.vue'

const forumApp = createApp(App)
forumApp.use(router)
forumApp.component('BaseDate', BaseDate)
forumApp.mount('#app')
