<template>
    <div v-if="error">
        Error (<span class="text-blue-500 cursor-pointer" @click="refetch">Try Again</span>)
    </div>
    <div v-else class="flex flex-col mt-4 gap-3">
        <div v-for="store in allStores" class=" border-l-4 border-slate-400 p-2">
            <p class=" font-bold text-2xl">{{ store.name }}</p>
            <p>By <span class="font-bold"> {{ store.user.fullName }} ({{ store.user.email }})</span> </p>
        </div>
    </div>
    <div @click="loadMore" class="text-blue-500 cursor-pointer">More</div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import storeQueries from '../../graphql/queries/store-queries';
import { useUserStore } from '../../stores/UserStore';
import { useGeneralStore } from '../../stores/GeneralStore';
import StorePreview from "../../types/store/store-preview"

// redirect
const userStore = useUserStore()
const router = useRouter();
if (!userStore.isAuthorized) {
    router.replace({ name: "Index" })
}

const route = useRoute()
let query
let variables: {
    userId?: string,
    offset?: number,
    limit?: number
}
if (route.name === "Stores") {
    query = storeQueries.getAllStores
    variables = {
        offset: 0,
        limit: 4
    }
} else {
    query = storeQueries.getMyStores
    variables = {
        userId: userStore.userId!,
        offset: 0,
        limit: 4
    }
}
const generalStore = useGeneralStore()
const { result, loading, error, refetch, onError, fetchMore } = useQuery<{ stores: StorePreview[] }>(
    query,
    variables,
    {
        fetchPolicy: "cache-and-network"
    }
)
onError((error) => {
    console.log(error)
})
watchEffect(() => {
    generalStore.setLoading(loading.value)
})
const allStores = computed(() => result.value?.stores ?? [])

function loadMore() {
    console.log("Load More")
    fetchMore({
        variables: {
            offset: result.value?.stores.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult
            return {
                ...previousResult,
                stores: [
                    ...previousResult.stores,
                    ...fetchMoreResult.stores,
                ],
            }
        }
    })
}
</script>