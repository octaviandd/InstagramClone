/** @format */

import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation CreateUser($input: SignupInput!) {
    createUser(input: $input) {
      user {
        id
        name
        username
        email
        images {
          id
        }
        createdAt
        comments {
          id
        }
        posts {
          id
        }
      }
      token
    }
  }
`;

export const NEW_POST = gql`
  mutation CreatePost($input: NewPostInput!) {
    createPost(input: $input) {
      id
      author {
        id
      }
      content
      createdAt
      likes
      comments {
        id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: SigninInput!) {
    loginUser(input: $input) {
      user {
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
      token
    }
  }
`;

export const S3_NEWSIGN = gql`
  mutation($input: NewS3!) {
    signS3(input: $input) {
      url
      signedRequest
    }
  }
`;

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
