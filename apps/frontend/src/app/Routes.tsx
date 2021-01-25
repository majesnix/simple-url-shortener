import React from "react";
import { Route, Switch } from "react-router";
import Admin from "./views/Admin";
import Login from "./views/Login";
import Terms from "./views/Terms";
import Error from "./views/Error";
import Index from "./views/Index";

export default () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/terms" component={Terms} />
    <Route component={Error} />
  </Switch>
);
