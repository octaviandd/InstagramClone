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

export const GET_USER_BY_ID = gql`
  query GetUser($input: ID!) {
    getUserById(input: $input) {
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

export const GET_USER_POSTS = gql`
  query GetPosts {
    getUserPosts {
      picture
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      picture
      id
      description
      createdAt
      likes
      author {
        id
        username
      }
    }
  }
`;
