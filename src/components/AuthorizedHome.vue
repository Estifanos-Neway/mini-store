<template>
    <div>
        You are signed in as {{ userStore.user.email }}
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore'
export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    }
}
</script>