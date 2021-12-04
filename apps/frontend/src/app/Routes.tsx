import React from "react";
import { Route, Routes } from "react-router";
import Admin from "./views/Admin";
import Login from "./views/Login";
import Terms from "./views/Terms";
import Error from "./views/Error";
import Index from "./views/Index";

export default () => (
  <Routes>
    <Route path="/">
      <Index />
    </Route>
    <Route path="/admin">
      <Admin/>
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/terms">
      <Terms/>
    </Route>
    <Route>
      <Error/>
    </Route>
  </Routes>
);
