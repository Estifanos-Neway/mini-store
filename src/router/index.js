// @ts-ignore
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/auth/Home.vue"
import SignUp from "../views/auth/SignUp.vue"
import SignIn from "../views/auth/SignIn.vue"

const routes = [
    {
        name:"Home",
        path:"/",
        component:Home
    },
    {
        name: "SignUp",
        path: "/signup",
        component: SignUp
    },
    {
        name: "SignIn",
        path: "/signin",
        component: SignIn
    }
]

const router = createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router