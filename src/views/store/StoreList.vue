<template>
    <div v-if="error">
        Error (<span class=" text-blue-500 cursor-pointer" @click="refetch">Try Again</span>)
    </div>
    <div v-else class="flex flex-col mt-7 gap-3">
        <div v-for="store in allStores" class=" border-l-4 border-slate-400 p-2">
            <p class=" font-bold text-2xl">{{ store.name }}</p>
            <p>By <span class="font-bold"> {{ store.user.fullName }} ({{ store.user.email }})</span> </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import storeQueries from '../../graphql/queries/storeQueries';
import { useUserStore } from '../../stores/UserStore';
import StorePreview from "../../types/store-preview"

// redirect
const userStore = useUserStore()
const router = useRouter();
if (!userStore.isAuthorized) {
    router.replace({ name: "Home" })
}

const route = useRoute()
let query
let variables: { userId?: string }
if (route.name === "Stores") {
    query = storeQueries.getAllStores
    variables = {}
} else {
    query = storeQueries.getMyStores
    variables = { userId: userStore.userId! }
}
const { result, loading, error, refetch, onError } = useQuery<{ stores: StorePreview[] }>(
    query,
    variables,
    {
        fetchPolicy: "cache-and-network"
    }
)
onError((error) => {
    console.log(error)
})
const allStores = computed(() => result.value?.stores ?? [])
</script>