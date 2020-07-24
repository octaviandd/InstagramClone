/** @format */
import { gql } from "apollo-server-express";

const typeDefs = gql`
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
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    parentPost: Post!
    createdAt: String!
    likes: Int!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    uri: String!
  }

  type Follower {
    id: ID!
    name: String!
  }

  type S3Payload {
    signedRequest: String!
    url: String!
  }

  input NewS3 {
    fileName: String!
    fileType: String!
  }

  type Following {
    id: ID!
    name: String
  }

  input FindUserById {
    id: ID!
  }

  input FollowerInput {
    id: ID!
    name: String!
  }

  input FollowingInput {
    id: ID!
    name: String!
  }

  type Query {
    getMe: User!
    getUser(input: ID!): User!
    getUsers: [User]!
    getPosts: [Post]!
    getPost(input: ID!): Post!
    getComments(input: ID!): [Comment]!
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    signS3(input: NewS3!): S3Payload!
    createPost(input: NewPostInput!): Post!
    createUser(input: SignupInput!): AuthUser!
    loginUser(input: SigninInput!): AuthUser!
    createComment(input: NewCommentInput!): Comment!
    likePost(input: ID!): Post!
    likeComment(input: ID!): Comment!
    addFriend(input: ID!): User!
  }

  # USER && AUTH
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    username: String!
    createdAt: String!
    age: Int!
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
    content: String!
  }

  input NewCommentInput {
    content: String!
  }

  # POST && COMMENT INPUT
`;

export default typeDefs;
