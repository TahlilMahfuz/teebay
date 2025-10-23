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

export const EDIT_PRODUCT = gql`
  mutation EditProduct($productId: Int!, $data: EditProductInput!) {
    editProduct(productId: $productId, data: $data) {
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
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: Int!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }
`;

export const UPDATE_VIEW_COUNT = gql`
  mutation UpdateViewCount($updateViewCountId: Int!) {
    updateViewCount(id: $updateViewCountId) {
      id
      title
      description
      price
      rentPerDay
      viewCount
      createdAt
      updatedAt
      ownerId
    }
  }
`

export const ADD_PRODUCT = gql`
  mutation AddProduct($data: AddProductInput!) {
  addProduct(data: $data) {
    id
    title
    description
    price
    rentPerDay
    viewCount
    ownerId
    createdAt
    updatedAt
    categories {
      id
      name
    }
  }
}
`

export const PURCHASE_PRODUCT = gql`
  mutation PurchaseProduct($productId: Int!) {
    purchaseProduct(productId: $productId) {
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
      isSold
      buyerId
    }
  }
`

export const RENT_PRODUCT = gql`
  mutation RentProduct($data: RentProductInput!) {
    rentProduct(data: $data) {
      id
      productId
      renterId
      startDate
      endDate
      createdAt
      product {
        id
        title
        description
        price
        rentPerDay
        ownerId
        isSold
        createdAt
        updatedAt
      }
      renter {
        id
        firstname
        lastname
        email
        phone
        address
        createdAt
        updatedAt
      }
    }
  }
`
