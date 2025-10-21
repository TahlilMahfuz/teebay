import { gql } from "graphql-tag";

export const userTypeDef = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phone: String
    address: String
    createdAt: String
    updatedAt: String
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String
    address: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    registerUser(data: RegisterInput!): User
    loginUser(data: LoginInput!): User
  }
`;
