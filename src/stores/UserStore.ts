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
    getters: {
        isAuthorized(state): boolean {
            return state.user !== null
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
        authorize(userAuth: UserAuth): void {
            this.tokens = userAuth
            // fetch user
            // assign user
            this.user = { email: "someemail@gmail.com" }
        }
    }
})