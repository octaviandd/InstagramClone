/** @format */
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    createdAt: String!
    age: Int!
    avatar: String!
    posts: [Post]!
    comments: [Comment]!
    images: [Image]!
    # followers: [Follower]!
    # following: [Following]!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  type Image {
    id: ID!
    url: String!
    author: String!
  }

  type Post {
    id: ID!
    author: User!
    content: String!
    createdAt: String!
    likes: Int!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
    likes: Int!
  }

  # type Follower {
  #   id: ID!
  #   name: String!
  # }

  # type Following {
  #   id: ID!
  #   name: String
  # }

  input FindUserById {
    id: ID!
  }

  input NewPostInput {
    content: String!
  }

  input NewCommentInput {
    content: String!
  }

  # input FollowerInput {
  #   id: ID!
  #   name: String!
  # }

  # input FollowingInput {
  #   id: ID!
  #   name: String!
  # }

  input SignupInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  type Query {
    getMe: User!
    getUser(id: ID!): User!
    getUsers: [User]!
    getPosts: [Post]!
    getPost(input: ID!): Post!
  }

  type Mutation {
    createPost(input: NewPostInput!): Post!
    createUser(input: SignupInput!): AuthUser!
    loginUser(input: SigninInput!): AuthUser!
    createComment(input: NewCommentInput!): Comment!
  }
`;

export default typeDefs;
