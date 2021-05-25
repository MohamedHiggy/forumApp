/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createStore } from 'vuex'
import sourceData from '@/data'
import { findById, upsert } from '@/helpers'

export default createStore({
    state: {
        ...sourceData,
        authId: 'L664y3qZSubDbT1R6npC0EEybJ73'
    },
    mutations: {
        SET_POST(state, { post }) {
            upsert(state.posts, post)
        },
        SET_THREAD(state, { thread }) {
            upsert(state.threads, thread)
        },
        SET_USER(state, { user, userId }) {
            const useIndex = state.users.findIndex(user => user.id === userId)
            state.users[useIndex] = user
        },
        APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
        APPEND_THREAD_TO_FORUM: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
        APPEND_THREAD_TO_USER: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
        APPEND_CONTRIBUTOR_TO_THREAD: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
    },
    getters: {
        authUser: (state, getters) => {
            return getters.user(state.authId)
        },
        user: state => {
            return (id) => {
                const user = findById(state.users, id)
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
        thread: state => {
            return (id) => {
                const thread = findById(state.threads, id)
                return {
                    ...thread,
                    get author() {
                        return findById(state.users, thread.userId)
                    },
                    get repliesCount() {
                        return thread.posts.length - 1
                    },
                    get contributorsCount() {
                        return thread.contributors.length
                    }
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
            commit('APPEND_POST_TO_THREAD', { childId: post.id, parentId: post.threadId })
            commit('APPEND_CONTRIBUTOR_TO_THREAD', { childId: state.authId, parentId: post.threadId })
        },
        async createThread({ commit, state, dispatch }, { text, title, forumId }) {
            const id = 'gggg' + Math.random()
            const userId = state.authId
            const publishedAt = Math.floor(Date.now() / 1000)
            const thread = {
                title,
                forumId,
                publishedAt,
                userId,
                id
            }
            commit('SET_THREAD', { thread })
            commit('APPEND_THREAD_TO_USER', { parentId: userId, childId: id })
            commit('APPEND_THREAD_TO_FORUM', { parentId: forumId, childId: id })
            dispatch('createPost', { text, threadId: id })
            return findById(state.threads, id)
        },
        async updateThread({ commit, state }, { text, title, id }) {
            const thread = findById(state.threads, id)
            const post = findById(state.posts, thread.posts[0])
            const newThread = {...thread, title }
            const newPost = {...post, text }
            commit('SET_THREAD', { thread: newThread })
            commit('SET_POST', { post: newPost })
            return newThread
        },
        updateUser({ commit }, user) {
            commit('SET_USER', { user, userId: user.id })
        }
    }
})

function makeAppendChildToParentMutation({ parent, child }) {
    return (state, { childId, parentId }) => {
        const resource = findById(state[parent], parentId)
        resource[child] = resource.posts || []
        if (!resource[child].includes(childId)) {
            resource[child].push(childId)
        }
    }
}