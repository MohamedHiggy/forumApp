/* eslint-disable indent */
/* eslint-disable eol-last */
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import BaseDate from '@/components/BaseData.vue'
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.component('BaseDate', BaseDate)
forumApp.mount('#app')