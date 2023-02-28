<template>
    <div class="h-16 border-slate-300 border-b-4">
        <div class="flex items-center flex-col">
            <div>Signed in as</div>
            <div class="font-bold text-lg">
                <p v-if="userStore.user">{{ userStore.user.fullName }} - {{ userStore.user.email
                }}</p>
                <p v-else>. . .</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { currentUserQuery } from '../graphql/queries/userQueries';
import { useUserStore } from '../stores/UserStore';
import User from '../types/user/user';

const userStore = useUserStore();

const { onResult } = useQuery<{ me: User }>(
    currentUserQuery,
    null,
    {
        pollInterval: 60000,
        fetchPolicy: "no-cache"
    }
)

onResult((result) => {
    userStore.user = result.data?.me ?? null
})

</script>