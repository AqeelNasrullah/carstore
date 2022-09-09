import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import AddCar from "./AddCar";
import Cars from "./Cars";
import Contact from "./Contact";
import EditCar from "./EditCar";
import Error404 from "./Error404";
import Home from "./Home";
import Lease from "./Lease";
import Login from "./Login";
import Order from "./Order";
import PrivacyPolicy from "./PrivacyPolicy";
import ViewCar from "./ViewCar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
      {...rest}
    />
  );
};

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />

      <Route path="/login">
        {isAuthenticated ? <Redirect to="/cars" /> : <Login />}
      </Route>

      {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
      <PrivateRoute exact path="/cars" component={Cars} />
      <PrivateRoute path="/cars/add" component={AddCar} />
      <PrivateRoute path="/cars/:id/view" component={EditCar} />

      <Route exact path="/:id" component={ViewCar} />
      <Route path="/:id/lease" component={Lease} />
      <Route path="/:id/order" component={Order} />

      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default Routes;
