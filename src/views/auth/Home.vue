<template>
    <div>
        <AuthorizedHome v-if="userStore.isAuthorized" />
        <UnauthorizedHome v-else />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthorizedHome from '../../components/AuthorizedHome.vue';
import UnauthorizedHome from '../../components/UnauthorizedHome.vue';
import { useUserStore } from '../../stores/UserStore';

export default defineComponent(
    {
        components: {
            AuthorizedHome,
            UnauthorizedHome
        },
        setup() {
            const userStore = useUserStore()
            return { userStore }
        }
    }
)
</script>