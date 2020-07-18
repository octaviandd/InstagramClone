/** @format */
/** @format */
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./api/src/typedefs";
import resolvers from "./api/src/resolvers";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createToken, getUserFromToken } from "./api/src/auth";
import models from "./api/src/models";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const user = getUserFromToken(token);
      return { user, models, createToken };
    },
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
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }

  app.listen({ port: 4000 }, () => {
    console.log("Server ready");
  });
};

startServer();
