import { gql } from "graphql-tag";

export const productTypeDef = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    rentPerDay: Float
    viewCount: Int
    createdAt: String
    updatedAt: String
    ownerId: Int!
    categories: [Category!]!
  }

  input AddProductInput {
    title: String!
    description: String!
    price: Float!
    rentPerDay: Float
    categories: [String!]!
    ownerId: Int!
  }

  type Query {
    allProducts: [Product!]!
    productById(id: Int!): Product
    allCategories: [Category!]!
  }

  type Mutation {
    addProduct(data: AddProductInput!): Product!
  }
`;
