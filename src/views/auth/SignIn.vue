<template>
    <h5> SignIn </h5>
    <div v-if="errors.general" class="text-red-600">{{ errors.general }}</div>
    <form @submit.prevent="handleSubmission" class="flex flex-col max-w-xl" novalidate>
        <label for="email">Email</label>
        <input type="email" v-model="signInInput.email">
        <div v-if="errors.email" class="text-red-600">{{ errors.email }}</div>
        <label for="password">Password</label>
        <input type="password" v-model="signInInput.password">
        <div v-if="errors.password" class="text-red-600">{{ errors.password }}</div>
        <button type="submit">Submit</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import funcs from "../../commons/functions"
import SignInInput from "../../types/signin-input"
export default defineComponent(
    {
        setup() {
            // vars
            const errors = ref({
                email: "",
                password: "",
                general: ""
            })
            const isLoading = ref<boolean>(false)

            // models
            const signInInput = ref<SignInInput>({
                email: "some1@gmail.com",
                password: "000000"
            })

            // handle submission
            async function handleSubmission() {
                isLoading.value = true
                // vars
                let hasError: boolean = false

                // check
                const isValidEmail = funcs.isValidEmail(signInInput.value.email)
                if (!isValidEmail.isValid) {
                    errors.value.email = isValidEmail.message
                    hasError = true
                } else {
                    errors.value.email = ""
                }
                const isValidPassword = funcs.isValidPassword(signInInput.value.password)
                if (!isValidPassword.isValid) {
                    errors.value.password = isValidPassword.message
                    hasError = true
                } else {
                    errors.value.password = ""
                }
                if (hasError) {
                    isLoading.value = false
                } else {
                    console.log("good")
                }
                // fetch

                // authorize

                // redirect
            }
            return { errors, signInInput, handleSubmission }
        }
    }
)
</script>