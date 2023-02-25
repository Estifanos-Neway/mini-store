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

<script>
import { useUserStore } from '../stores/UserStore';
export default {
    setup() {
        const userStore = useUserStore()
        function logout() {
            userStore.logout()
        }
        return { userStore, logout }
    }
}
</script>