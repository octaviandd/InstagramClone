/** @format */
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Image {
    _id: ID!
    url: String!
    author: User!
  }

  type Post {
    _id: ID!
    author: User!
    description: String!
    createdAt: String!
    picture: String!
    likes: Int!
    comments: [Comment]!
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    parentPost: User!
    createdAt: String!
    likes: Int!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    uri: String!
  }

  type Query {
    getMe: User!
    getUserById(input: ID!): User!
    getUsers: [User]!
    getAllPosts: [Post]!
    getUserPosts(input: ID!): [Post]!
    getPost(input: ID!): Post!
    getPostComments(input: ID!): [Comment]!
    getFollowers(input: ID!): [User]!
    getFollowedUsers(input: ID!): [User]!
  }

  type Mutation {
    unfollowUser(input: ID!): User!
    singleUpload(file: Upload!): File!
    createPost(input: NewPostInput!): Post!
    createUser(input: SignupInput!): AuthUser!
    loginUser(input: SigninInput!): AuthUser!
    createComment(input: NewCommentInput!): Comment!
    likePost(input: ID!): Post!
    likeComment(input: ID!): Comment!
    followUser(input: ID!): User!
    unlikePost(input: ID!): Post!
  }

  # USER && AUTH
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    username: String!
    createdAt: String!
    age: Int!
    posts: [Post]!
    comments: [Comment]!
    images: [Image]!
    followers: [User]!
    following: [User]!
  }

  type AuthUser {
    token: String!
    user: User!
  }
  # USER && AUTH

  # Authentication INPUT

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

  # Authentication INPUT

  # POST && COMMENT INPUT

  input NewPostInput {
    description: String!
    picture: String!
  }

  input NewCommentInput {
    content: String!
    _id: ID!
  }

  # POST && COMMENT INPUT
`;

export default typeDefs;
