/** @format */

import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="register" component={Register}></Route>
        <Route exact path="/profile" component={Profile}></Route>
      </Switch>
    </>
  );
}

export default App;
