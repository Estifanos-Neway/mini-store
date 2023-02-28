<template>
    <h4> SignUp </h4>
    <br>
    <div v-if="errors.general" class="text-red-600">{{ errors.general }}</div>
    <form @submit.prevent="handleSubmission" class="flex flex-col max-w-xl" novalidate>
        <label for="fullName">Full Name</label>
        <input type="text" v-model="signUpInput.fullName" name="fullName">
        <div v-if="errors.fullName" class="text-red-600">{{ errors.fullName }}</div>
        <label for="email">Email</label>
        <input type="email" v-model="signUpInput.email" name="email" novalidate>
        <div v-if="errors.email" class="text-red-600">{{ errors.email }}</div>
        <label for="password">Password</label>
        <input type="password" v-model="signUpInput.password" name="password">
        <div v-if="errors.password" class="text-red-600">{{ errors.password }}</div>
        <div v-if="isLoading">Loading...</div>
        <button v-else type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from '../../stores/UserStore';
import axios, { Axios, AxiosError } from "axios"
import vars from "../../commons/variables"
import funcs from "../../commons/functions"
import SignUpInput from "../../types/user/signup-input"

// redirect
const userStore = useUserStore()
const router = useRouter();
if(userStore.isAuthorized){
    router.replace({ name: "Index" })
}

// vars
const isLoading = ref<boolean>(false)
const errors = ref(
    {
        fullName: "",
        email: "",
        password: "",
        general: ""
    }
)
// models
const signUpInput = ref<SignUpInput>({
    fullName: "fn",
    email: "some@gmail.com",
    password: "000000"
})

// handlers
async function handleSubmission() {
    // start loading
    isLoading.value = true
    let hasValidationError = false
    // check
    if (signUpInput.value.fullName.length === 0) {
        errors.value.fullName = "Full name can't be empty"
        hasValidationError = true
    }
    else {
        errors.value.fullName = ""
    }
    const isValidEmail = funcs.isValidEmail(signUpInput.value.email)
    if (!isValidEmail.isValid) {
        errors.value.email = isValidEmail.message
        hasValidationError = true
    }
    else {
        errors.value.email = ""
    }
    const isValidPassword = funcs.isValidPassword(signUpInput.value.password)
    if (!isValidPassword.isValid) {
        errors.value.password = isValidPassword.message
        hasValidationError = true
    }
    else {
        errors.value.password = ""
    }
    if (hasValidationError) {
        isLoading.value = false
    } else {
        try {
            const response = await axios.post(
                vars.authSignUpUrl,
                {
                    fullName: signUpInput.value.fullName,
                    email: signUpInput.value.email,
                    passwordHash: signUpInput.value.password
                }
            )
            // authorize
            await userStore.authorize(
                {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }
            )
            // redirect
            router.replace({ name: "Index" })
        } catch (error) {
            if ((error as AxiosError).response?.status === 409) {
                errors.value.general = "Email already in use"
            } else {
                errors.value.general = vars.unknownErrorMessage
            }
            isLoading.value = false
        }
    }
}
</script>