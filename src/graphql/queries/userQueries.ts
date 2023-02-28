import gql from "graphql-tag";

export const currentUserQuery = gql`
query {
    me {
        id
        fullName
        email
        avatarImageUrl
        memberSince
    }
}
`