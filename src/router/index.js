/* eslint-disable indent */
/* eslint-disable eol-last */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import NotFound from '@/pages/NotFound.vue'
import sourceData from '@/data'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: ThreadShow,
        props: true,
        beforeEnter: (to, from, next) => {
            // check if thread exist
            const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
                // if thread exist
            if (threadExists) {
                return next()
            } else {
                next({
                    name: 'NotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash
                })
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }

]

export default createRouter({
    history: createWebHistory(),
    routes
})