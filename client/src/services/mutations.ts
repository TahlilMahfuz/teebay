import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($data: RegisterInput!) {
    registerUser(data: $data) {
      id
      firstname
      lastname
      email
      phone
      address
      token
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($data: LoginInput!) {
    loginUser(data: $data) {
      id
      firstname
      lastname
      email
      phone
      address
      token
      createdAt
      updatedAt
    }
  }
`;
