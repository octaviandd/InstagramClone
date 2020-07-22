/** @format */

import gql from "graphql-tag";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      username
      email
      createdAt
      images {
        id
      }
      posts {
        id
      }
      comments {
        id
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getMe {
      id
      name
      email
      createdAt
      images {
        id
      }
      posts {
        id
      }
      comments {
        id
      }
    }
  }
`;

export const TEST_GQL = gql`
  query GetTest {
    test
  }
`;
