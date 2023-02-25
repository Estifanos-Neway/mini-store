<template>
    <div>
        <AuthorizedHome v-if="userStore.isAuthorized" />
        <UnauthorizedHome v-else />
    </div>
</template>

<script>
import AuthorizedHome from '../../components/AuthorizedHome.vue';
import UnauthorizedHome from '../../components/UnauthorizedHome.vue';
import { useUserStore } from '../../stores/UserStore';

export default {
    components: {
        AuthorizedHome,
        UnauthorizedHome
    },
    setup() {
        const userStore = useUserStore()
        return {userStore}
    }
}
</script>