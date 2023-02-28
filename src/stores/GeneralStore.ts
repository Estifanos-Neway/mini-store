import { defineStore } from "pinia"

export const useGeneralStore = defineStore("GeneralStore", {
    state: () => ({
        isLoading: false
    }),
    actions: {
        setLoading(loadingState: boolean) {
            this.isLoading = loadingState
        }
    }
})