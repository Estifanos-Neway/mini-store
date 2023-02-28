import gql from "graphql-tag";

export default {
    getAllStoreCategories:gql`
      query AllStoreCategories {
        store_categories {
          id
          name
        }
      }
    `
}