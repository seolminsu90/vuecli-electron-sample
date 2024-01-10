import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        info: {},
        token: {
            access: '',
            refresh: ''
        }
    }),
    getters: {
        get: (state) => state.info,
        getToken: (state) => state.token
    },
    actions: {
        set(payload) {
            this.info = payload
        },
        setToken(payload) {
            this.token = payload
        }
    },
    persist: {
        storage: localStorage,
    },
})
