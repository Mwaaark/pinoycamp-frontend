import React from "react";
import Layout from "./components/layout/Layout";
import { Redirect, Route, Switch } from "react-router";
import Index from "./pages/Campgrounds/Index";
import NotFound from "./pages/NotFound";
import New from "./pages/Campgrounds/New";
import Show from "./pages/Campgrounds/Show";
import Edit from "./pages/Campgrounds/Edit";
import Register from "./pages/Users/Register";
// import AuthContext from "./context/auth-context";
import Login from "./pages/Users/Login";

import "./App.css";

export default function App() {
  // const authCtx = useContext(AuthContext);

  // let routes;

  // if (authCtx.isLoggedIn) {
  // } else {
  // }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/campgrounds" />
        </Route>
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/campgrounds" component={Index} exact />
        <Route path="/campgrounds/new" component={New} exact />
        <Route path="/campgrounds/:id" component={Show} exact />
        <Route path="/campgrounds/:id/edit" component={Edit} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}
