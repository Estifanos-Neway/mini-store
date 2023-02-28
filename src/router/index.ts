// @ts-ignore
import { createRouter, createWebHistory } from "vue-router"
import Index from "../views/Index.vue"
import SignUp from "../views/auth/SignUp.vue"
import SignIn from "../views/auth/SignIn.vue"
import StoreList from "../views/store/StoreList.vue"
import CreateStore from "../views/store/CreateStore.vue"

const routes = [
    {
        name: "Index",
        path: "/",
        component: Index
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
    },
    {
        name: "Stores",
        path: "/stores",
        component: StoreList,
    },
    {
        name: "MyStores",
        path: "/mystores",
        component: StoreList,
    },
    {
        name:"CreateStore",
        path:"/createstore",
        component: CreateStore
    }
]

const router = createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router