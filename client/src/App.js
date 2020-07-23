/** @format */

import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import { PrivateRoute } from "./components/private-route";
import { LoggedInRoute } from "./components/loggedin-route";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <LoggedInRoute exact path="/login" component={Login} />
          <LoggedInRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
