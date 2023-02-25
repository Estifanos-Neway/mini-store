<!-- <template>
    <h3> SignUp </h3>
    <form @submit.prevent="handleSubmission" class="flex flex-col max-w-xl">
        <label for="fullName">Full Name</label>
        <input type="text" v-model="fullName" name="fullName" required>
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" required>
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" required>
        <div v-if="error">{{ error }}</div>
        <button>Submit</button>
    </form>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from '../../stores/UserStore';
import axios from "axios"
import vars from "../../commons/variables"
export default {
    setup() {
        const router = useRouter();
        const fullName = ref("fn")
        const email = ref("some@gmail.com")
        const password = ref("pwh")
        const userStore = useUserStore()
        const error = ref(null)
        async function handleSubmission() {
            // check
            // post
            try {
                const response = await axios.post(
                    `${vars.authBaseUrl}/signup`,
                    {
                        fullName: fullName.value,
                        email: email.value,
                        passwordHash: password.value
                    }
                )
                // authorize
                userStore.authorize(response.data.accessToken)
                router.replace({ name: "Home" })
            } catch (error) {
                if (error.response?.status === 409) {
                    error.value = "Email already in use"
                } else {
                    error.value = "Something went wrong, please try again."
                }
            }

            // redirect
            // router.replace({ name: "Home" })
        }
        return { fullName, email, password, error, handleSubmission }
    }
}
</script> -->