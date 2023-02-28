import gql from "graphql-tag";

export default {
  insertStore: gql`
  mutation InsertStore(
              $name: String!
              $categoryId: uuid
              $avatarImageUrl: String
            ) {
              insert_stores(
                objects: {
                  name: $name
                  categoryId: $categoryId
                  avatarImageUrl: $avatarImageUrl
                }
              ) {
                returning {
                  id
                }
              }
            }
`
}