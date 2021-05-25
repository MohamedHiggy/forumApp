/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore } from 'vuex'
import sourceData from '@/data'

export default createStore({
    state: {
        ...sourceData,
        authId: 'L664y3qZSubDbT1R6npC0EEybJ73'
    },
    mutations: {
        SET_POST(state, { post }) {
            state.posts.push(post)
        },
        SET_USER(state, { user, userId }) {
            const useIndex = state.users.findIndex(user => user.id === userId)
            state.users[useIndex] = user
        },
        APPEND_POST(state, { postId, threadId }) {
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        }
    },
    getters: {
        authUser: state => {
            const user = state.users.find(user => user.id === state.authId)
            if (!user) return null
            return {
                ...user,
                get posts() {
                    return state.posts.filter(post => post.userId === user.id)
                },
                get postsCount() {
                    return this.posts.length
                },
                get threads() {
                    return state.threads.filter(thread => thread.userId === user.id)
                },
                get threadsCount() {
                    return this.threads.length
                }
            }
        }
    },
    actions: {
        createPost({ commit, state }, post) {
            post.id = 'postId' + Math.random()
            post.userId = state.authId
            post.publishedAt = Math.floor(Date.now() / 1000)
            commit('SET_POST', { post })
            commit('APPEND_POST', { postId: post.id, threadId: post.threadId })
        },
        updateUser({ commit }, user) {
            commit('SET_USER', { user, userId: user.id })
        }
    }
})
