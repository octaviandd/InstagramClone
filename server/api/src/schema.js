/** @format */
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
    posts: [Post]!
    comments: [Comment]!
    img: String!
    friends: [Friend]!
  }

  type Friend {
    id: ID!
    name: String!
    img: String!
  }

  type Post {
    id: ID!
    text: String!
  }

  type Comment {
    id: ID!
    text: String!
  }

  input FindUserById {
    id: ID!
  }

  input NewUserInput {
    id: ID!
    name: String!
    age: Int!
    email: String!
    friends: NewFriend!
    comments: NewComment!
    img: String!
    posts: NewPost!
  }

  input NewFriend {
    id: ID!
    name: String!
    img: String!
  }

  input NewPost {
    id: ID!
    text: String!
  }

  input NewComment {
    id: ID!
    text: String!
  }

  type Query {
    getUser(input: FindUserById!): User!
    getUsers: [User]!
  }

  type Mutation {
    newUser(input: NewUserInput!): User!
  }
`;

module.exports = typeDefs;
