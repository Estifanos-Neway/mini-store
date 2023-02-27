import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import { createPinia } from "pinia"
import router from "./router"
import "./style.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import vars from "./commons/variables"
import { useUserStore } from './stores/UserStore'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost';


// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// apollo
const authLink = new ApolloLink((operation, forward) => {
    const token = getAccessToken()
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });
    return forward(operation);
});

const httpLink = new HttpLink({
    uri: vars.hasuraEndpoint
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function getAccessToken(): string {
    const userStore = useUserStore()
    const token = userStore.accessToken
    return token
}
// app
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})
app.use(pinia).use(router).mount("#app")
