<template>
    <h3> SignUp </h3>
    <form @submit.prevent="handleSubmission" class="flex flex-col max-w-xl">
        <label for="fullName">Full Name</label>
        <input type="text" v-model="fullName" name="fullName">
        <div v-if="error.fullName" class="text-red-600">{{ error.fullName }}</div>
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" novalidate>
        <div v-if="error.email" class="text-red-600">{{ error.email }}</div>
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password">
        <div v-if="error.password" class="text-red-600">{{ error.password }}</div>
        <div v-if="isLoading">Loading...</div>
        <button v-else type="submit">Submit</button>
    </form>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from '../../stores/UserStore';
import funcs from "../../commons/functions"
export default {
    setup() {
        // vars
        const userStore = useUserStore()
        const isLoading = ref(false)
        const error = ref(
            {
                fullName: "",
                email: "",
                password: "",
            }
        )
        // models
        const router = useRouter();
        const fullName = ref("fn")
        const email = ref("some@gmail.com")
        const password = ref("pwh")

        // handlers
        async function handleSubmission() {
            // start loading
            isLoading.value = true
            let hasError = false
            // check
            if (fullName.value.length === 0) {
                error.value.fullName = "Full name can't be empty"
                hasError = true
            }
            else {
                error.value.fullName = ""
            }
            if (!funcs.isValidEmail(email.value)) {
                error.value.email = "Invalid Email"
                hasError = true
            }
            else {
                error.value.email = ""
            }
            if (password.value.length < 6) {
                error.value.password = "Password too short"
                hasError = true
            }
            else {
                error.value.password = ""
            }
            if (hasError) {
                isLoading.value = false
            } else {
                // post
                // authorize
                // userStore.authorize()
                // redirect
                // router.replace({ name: "Home" })
            }
        }
        return { fullName, email, password, isLoading, error, handleSubmission }
    }
}
</script>