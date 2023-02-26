<template>
    <div class="break-words">
        Your accessToken is
        <br>
        <br>
        {{ userStore.tokens.accessToken }}
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/UserStore'
const userStore = useUserStore()
</script>