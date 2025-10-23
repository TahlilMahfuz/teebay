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
      isSold
      rentals{
        id
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

export const GET_USER_ACTIVITY = gql`
  query GetUserActivity {
    getUserActivity {
      boughtProducts {
        id
        title
        description
        price
        rentPerDay
        viewCount
        createdAt
        owner {
          id
          firstname
          lastname
          email
        }
        categories {
          id
          name
        }
      }

      soldProducts {
        id
        title
        description
        price
        rentPerDay
        viewCount
        createdAt
        buyer {
          id
          firstname
          lastname
          email
        }
        categories {
          id
          name
        }
      }

      rentedProducts {
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
          owner {
            id
            firstname
            lastname
            email
          }
          categories {
            id
            name
          }
        }
        renter {
          id
          firstname
          lastname
          email
        }
      }

      lentProducts {
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
          categories {
            id
            name
          }
        }
        renter {
          id
          firstname
          lastname
          email
        }
      }
    }
  }
`