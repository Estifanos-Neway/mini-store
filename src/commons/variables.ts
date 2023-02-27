const authBaseUrl = "http://localhost:8080"

export default {
    authSignUpUrl: `${authBaseUrl}/signup`,
    authSignInUrl: `${authBaseUrl}/signin`,
    hasuraEndpoint: "https://funny-starfish-21.hasura.app/v1/graphql",
    unknownErrorMessage: "Something went wrong, please try again"
}