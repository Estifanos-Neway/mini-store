import gql from "graphql-tag";

let getAllStores = gql`
query GetAllStores($offset: Int, $limit: Int) {
  stores(offset: $offset, limit: $limit) {
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
query GetMyStores($userId: uuid!,$offset: Int, $limit: Int) {
  stores(where: {userId: {_eq: $userId}},offset: $offset, limit: $limit) {
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