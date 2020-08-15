/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./navbar";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") ? (
        <>
          <Navbar />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
