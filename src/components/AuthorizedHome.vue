<template>
    <div class="break-words">
        Your accessToken is
        <br>
        <br>
        {{ userStore.tokens.accessToken }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/UserStore'
export default defineComponent(
    {
        setup() {
            const userStore = useUserStore()
            return { userStore }
        }
    }
)
</script>