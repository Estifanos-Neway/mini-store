<template></template>

<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { useRouter } from "vue-router"

const userStore = useUserStore()
const router = useRouter()
if (userStore.isAuthorized) {
    router.replace({ name: "Stores"})
} else {
    router.replace({ name: "SignIn" })
}
</script>