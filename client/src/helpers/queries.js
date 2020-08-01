/** @format */

import gql from "graphql-tag";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      name
      username
      email
      createdAt
      images {
        _id
      }
      posts {
        _id
      }
      comments {
        _id
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($input: ID!) {
    getUserById(input: $input) {
      _id
      name
      email
      username
      createdAt
      images {
        _id
      }
      posts {
        _id
        picture
      }
      comments {
        _id
      }
      following {
        _id
      }
      followers {
        _id
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getMe {
      _id
      name
      email
      username
      createdAt
      images {
        _id
      }
      posts {
        _id
      }
      comments {
        _id
      }
      following {
        _id
      }
      followers {
        _id
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetPosts($input: ID!) {
    getUserPosts(input: $input) {
      _id
      picture
      description
      author {
        _id
      }
      comments {
        _id
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      picture
      _id
      description
      createdAt
      likes {
        _id
      }
      author {
        _id
        username
      }
      comments {
        _id
        content
        author {
          _id
        }
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($input: ID!) {
    getPostComments(input: $input) {
      _id
      content
      author {
        _id
        username
      }
      parentPost {
        _id
      }
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($input: ID!) {
    getPost(input: $input) {
      _id
    }
  }
`;
