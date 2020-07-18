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
    followers: [Follower]!
    following: [Following]!
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
    content: String!
    author: User!
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

  type Follower {
    id: ID!
    name: String!
  }

  type Following {
    id: ID!
    name: String
  }

  input FindUserById {
    id: ID!
  }

  input NewPostInput {
    content: String!
  }

  input CommentInput {
    id: ID!
    content: String!
  }

  input FollowerInput {
    id: ID!
    name: String!
  }

  input FollowingInput {
    id: ID!
    name: String!
  }

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

  input NewUserInput {
    id: ID!
    name: String!
    age: Int!
    avatar: String!
    password: String!
    img: String!
    posts: NewPostInput!
    comments: CommentInput!
    followers: FollowerInput!
    following: FollowingInput!
  }

  type Query {
    getMe: User!
    getUser(id: ID!): User!
    getUsers: [User]!
    getPosts: [Post]!
    getPost(input: ID!): Post!
  }

  type Mutation {
    newUser(input: NewUserInput!): User!
    createPost(input: NewPostInput!): Post!
    createUser(input: SignupInput!): AuthUser!
    loginUser(input: SigninInput!): AuthUser!
  }
`;

export default typeDefs;
