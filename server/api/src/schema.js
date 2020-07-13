/** @format */
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    name: String!
    age: Int!
  }

  input FindUser {
    name: String!
  }

  type Query {
    getUsers(input: FindUser!): [User]!
  }

  input NewUserInput {
    name: String!
  }

  type Mutation {
    NewUser(input: NewUserInput!): [User!]
  }
`;

module.exports = typeDefs;
