<template>
    <div>
        <AuthorizedHome v-if="userStore.isAuthorized" />
        <UnauthorizedHome v-else />
    </div>
</template>

<script setup lang="ts">
import AuthorizedHome from '../../components/AuthorizedHome.vue';
import UnauthorizedHome from '../../components/UnauthorizedHome.vue';
import { useUserStore } from '../../stores/UserStore';

const userStore = useUserStore()
</script>