/** @format */
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({
    app,
    onHealthCheck: () =>
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve();
        } else {
          reject();
        }
      }),
  });

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }

  app.listen({ port: 4000 }, () => {
    console.log("Server ready");
  });
};

startServer();
