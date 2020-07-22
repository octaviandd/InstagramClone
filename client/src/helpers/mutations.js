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
