import { gql } from "graphql-tag";

export const rentalTypeDef = gql`
  input RentProductInput {
    productId: Int!
    startDate: String!
    endDate: String!
  }

  type UserActivity {
    boughtProducts: [Product!]!
    soldProducts: [Product!]!
    rentedProducts: [Rental!]!
    lentProducts: [Rental!]!
  }

  type Rental {
    id: ID!
    productId: Int!
    renterId: Int!
    startDate: String!
    endDate: String!
    createdAt: String!
    product: Product!
    renter: User!
  }

  extend type Product {
    isSold: Boolean
    buyerId: Int
    buyer: User
    rentals: [Rental!]!
  }

  extend type Query {
    getUserActivity: UserActivity
  }

  extend type Mutation {
    purchaseProduct(productId: Int!): Product!
    rentProduct(data: RentProductInput!): Rental!
  }

`;
