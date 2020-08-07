/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createUploadLink } from "apollo-upload-client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
