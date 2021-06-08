import React, { useContext, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import AuthContext from "./context/auth-context";
import Layout from "./components/layout/Layout";
import { Spinner } from "react-bootstrap";

const Index = React.lazy(() => import("./pages/Campgrounds/Index"));
const New = React.lazy(() => import("./pages/Campgrounds/New"));
const Show = React.lazy(() => import("./pages/Campgrounds/Show"));
const Edit = React.lazy(() => import("./pages/Campgrounds/Edit"));
const Register = React.lazy(() => import("./pages/Users/Register"));
const Login = React.lazy(() => import("./pages/Users/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/campgrounds" />
          </Route>
          <Route path="/register" exact>
            {authCtx.token ? <Redirect to="/campgrounds" /> : <Register />}
          </Route>
          <Route path="/login" exact>
            {authCtx.token ? <Redirect to="/campgrounds" /> : <Login />}
          </Route>
          <Route path="/campgrounds" component={Index} exact />
          <Route path="/campgrounds/new" exact>
            {authCtx.token ? <New /> : <Redirect to="/login" />}
          </Route>
          <Route path="/campgrounds/:id" component={Show} exact />
          <Route
            path="/campgrounds/:id/edit"
            exact
            render={({ match }) =>
              authCtx.token ? (
                <Edit />
              ) : (
                <Redirect to={`/campgrounds/${match.params.id}`} />
              )
            }
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}
