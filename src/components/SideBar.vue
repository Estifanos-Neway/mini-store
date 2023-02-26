<template>
    <div class="flex flex-col justify-between items-center py-12 h-full">
        <router-link to="/" class="text-3xl">
            LOGO
        </router-link>
        <div v-if="userStore.isAuthorized" class="flex flex-col w-full px-5 auth-nav">
            <button class="auth-nav-button" @click="logout">Log Out</button>
        </div>
        <div v-else class="flex flex-col w-full px-5 auth-nav">
            <router-link :to="{ name: 'SignUp' }" class="auth-nav-button">Sign Up</router-link>
            <router-link :to="{ name: 'SignIn' }" class="auth-nav-button">Sign In</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
export default defineComponent(
    {
        setup() {
            const userStore = useUserStore()
            function logout(): void {
                userStore.logout()
            }
            return { userStore, logout }
        }
    }
)
</script>

<style>
.auth-nav-button {
    @apply text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800
}
</style>