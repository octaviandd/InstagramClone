/** @format */

import React from "react";
import "./App.css";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import { PrivateRoute } from "./components/private-route";
import { LoggedInRoute } from "./components/loggedin-route";
import Post from "./pages/post";
import Explore from "./pages/explore";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <LoggedInRoute exact path="/login" component={Login} />
          <LoggedInRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/post/:id" component={Post} />
          <PrivateRoute exact path="/explore" component={Explore} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
