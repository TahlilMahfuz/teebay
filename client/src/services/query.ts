import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      title
      description
      price
      rentPerDay
      viewCount
      createdAt
      updatedAt
      ownerId
      categories {
        id
        name
      }
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
    }
  }
`;

