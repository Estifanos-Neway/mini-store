import gql from "graphql-tag";

let getAllStores = gql`
query GetAllStores {
  stores {
    avatarImageUrl
    id
    name
    user {
      fullName
      email
    }
  }
}
`
let getMyStores = gql`
query GetMyStores($userId: uuid!) {
  stores(where: {userId: {_eq: $userId}}) {
    avatarImageUrl
    id
    name
    user {
      fullName
      email
    }
  }
}
`

export default {
  getAllStores,
  getMyStores
}