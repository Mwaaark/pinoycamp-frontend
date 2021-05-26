import React from "react";
import Layout from "./components/layout/Layout";
import { Redirect, Route, Switch } from "react-router";
import Index from "./pages/Campgrounds/Index";
import NotFound from "./pages/NotFound";
import New from "./pages/Campgrounds/New";
import Show from "./pages/Campgrounds/Show";

import "./App.css";
import Edit from "./pages/Campgrounds/Edit";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/campgrounds" />
        </Route>
        <Route path="/campgrounds" component={Index} exact />
        <Route path="/campgrounds/new" component={New} exact />
        <Route path="/campgrounds/:id" component={Show} exact />
        <Route path="/campgrounds/:id/edit" component={Edit} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}
