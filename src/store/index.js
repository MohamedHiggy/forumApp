/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore } from 'vuex'
import sourceData from '@/data'

export default createStore({
    state: sourceData,
    mutations: {
        SET_POST(state, { post }) {
            state.posts.push(post)
        },
        APPEND_POST(state, { postId, threadId }) {
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        }
    },
    actions: {
        createPost(context, post) {
            context.commit('SET_POST', { post })
            context.commit('APPEND_POST', { postId: post.id, threadId: post.threadId })
        }
    }
})
