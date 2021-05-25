/* eslint-disable indent */
/* eslint-disable eol-last */
import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/components/PageHome.vue'
import PageThreadShow from '@/components/PageThreadShow.vue'
import NotFound from '@/components/NotFound.vue'
import sourceData from '@/data'

const routes = [{
        path: '/',
        name: 'Home',
        component: PageHome
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: PageThreadShow,
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