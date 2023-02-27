import { defineStore } from "pinia"
import User from "../types/user"
import UserAuth from "../types/user-auth"

export const useUserStore = defineStore("userStore", {
    state: () => ({
        tokens: {
            accessToken: "",
            refreshToken: ""
        } as UserAuth,
        user: null as User | null
    }),
    persist: true,
    getters: {
        isAuthorized(state): boolean {
            return state.tokens.accessToken.length > 0
        },
        accessToken(state) {
            return state.tokens.accessToken
        },
        refreshToken(state) {
            return state.tokens.refreshToken
        }
    },
    actions: {
        logout(): void {
            this.user = null
            this.tokens = {
                accessToken: "",
                refreshToken: ""
            }
        },
        async authorize(userAuth: UserAuth): Promise<void> {
            this.tokens = userAuth
        }
    }
})