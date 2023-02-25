import { defineStore } from "pinia"

export const useUserStore = defineStore("userStore", {
    state: () => ({
        tokens: {
            accessToken: null,
            refreshToken: null
        },
        user: null
    }),
    getters: {
        isAuthorized(state) {
            return !!state.user
        }
    },
    actions: {
        logout() {
            this.user = null
        },
        authorize(accessToken) {
            console.log(accessToken)
            this.user = { email: "someemail@gmail.com" }
        }
    }
})