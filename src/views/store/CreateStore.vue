<template>
    <div>
        <h3>
            Create Stores
        </h3>
        <br>
        <p v-if="errors.general" class="text-red-600">{{ errors.general }}</p>
        <form @submit.prevent="handleSubmission" class="flex flex-col max-w-xl">
            <label for="name">Name</label>
            <input type="text" v-model="createStoreInput.name" name="name">
            <p v-if="errors.name" class="text-red-600">{{ errors.name }}</p>
            <label for="categoryId">Category</label>
            <select name="categoryId" v-model="createStoreInput.categoryId">
                <option v-for="storeCategory in allStoreCategories" :value="storeCategory.id">{{ storeCategory.name }}
                </option>
            </select>
            <label for="avatarImageUrl">Avatar Image URL</label>
            <input type="text" v-model="createStoreInput.avatarImageUrl" name="avatarImageUrl">
            <div v-if="isLoading">Loading...</div>
            <button v-else type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref, computed, watch } from 'vue';
import CreateStoreInput from "../../types/store/create-store-input"
import StoreCategory from "../../types/store/store-category"
import storeCategoryQueries from "../../graphql/queries/store-category-queries"
import storeMutations from "../../graphql/mutations/store-mutations"

// vars
let isLoading = ref(false)
const errors = ref({
    name: "",
    general: ""
})

// pre fetches
const { result, onError: onCategoryQueryError } = useQuery<{ store_categories: StoreCategory[] }>(
    storeCategoryQueries.getAllStoreCategories,
    null,
    {
        fetchPolicy: "cache-and-network"
    }
)
onCategoryQueryError(error => console.log(error))
const allStoreCategories = computed(() => result.value?.store_categories ?? [])

const createStoreInput = ref<CreateStoreInput>({
    name: "",
    categoryId: undefined,
    avatarImageUrl: undefined
})
watch(allStoreCategories, (newValue) => { createStoreInput.value.categoryId = newValue[0]?.id })

const { mutate: insertStore, onDone, onError: onStoreInsertError } = useMutation<{ insert_stores: { returning: [{ id: string }] } }, CreateStoreInput>(storeMutations.insertStore)

function handleSubmission() {
    errors.value.general = ""
    let hasError: boolean = false
    isLoading.value = true
    if (!createStoreInput.value.name) {
        errors.value.name = "Name can't be empty"
        hasError = true
    } else {
        errors.value.name = ""
    }
    if (hasError) {
        isLoading.value = false
    } else {
        insertStore(
            {
                name: createStoreInput.value.name,
                categoryId: createStoreInput.value.categoryId,
                avatarImageUrl: createStoreInput.value.avatarImageUrl
            }
        )
        onDone((result) => {
            console.log("data", result.data?.insert_stores.returning[0].id)
            isLoading.value = false
        })
        onStoreInsertError(error => {
            if(error.message.startsWith("GraphQL error: Uniqueness violation")){
                errors.value.general = "Name already exist"
                isLoading.value = false
            }
        })
    }

}
</script>