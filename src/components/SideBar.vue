<template>
    <div class="flex flex-col justify-between items-center py-12 px-5 h-full bg-slate-300">
        <div class="flex flex-col w-full gap-12">
            <router-link to="/" class="text-4xl font-bold text-center border-b-2 pb-4 border-slate-200">
                MINI
                <br>
                STORE
            </router-link>
            <div v-if="userStore.isAuthorized" class="flex flex-col">
                <router-link :to="{ name: 'Stores' }" class="auth-nav-button">
                    All Stores
                </router-link>
                <router-link :to="{ name: 'MyStores' }" class="auth-nav-button">
                    My Stores
                </router-link>
                <router-link :to="{ name: 'CreateStore' }" class="auth-nav-button">
                    Add Store
                </router-link>
            </div>
        </div>
        <div v-if="userStore.isAuthorized" class="flex flex-col w-full auth-nav">
            <button class="auth-nav-button" @click="logout">Log Out</button>
        </div>
        <div v-else class="flex flex-col w-full auth-nav">
            <router-link :to="{ name: 'SignUp' }" class="auth-nav-button">
                Sign Up
            </router-link>
            <router-link :to="{ name: 'SignIn' }" class="auth-nav-button">
                Sign In
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
function logout(): void {
    userStore.logout()
    router.replace({ name: "SignIn" })
}
</script>

<style>
.auth-nav-button {
    @apply text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800
}
</style>