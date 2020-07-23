/** @format */

import gql from "graphql-tag";

export const GET_USERS = gql`
  query GetUsers {
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

export const GET_USER = gql`
  query GetUser($input: ID!) {
    getUser(input: $input) {
      id
      name
      email
      username
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
      following {
        id
      }
      followers {
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
      username
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
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;
