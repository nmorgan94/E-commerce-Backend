import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Basket } from "./components/Basket";
import { User } from "./components/User";
import { Home } from "./components/Home";
import { Checkout } from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import ValidatedFormLogin from "./components/ValidatedFormLogin";
import ValidatedSignup from "./components/ValidatedSignup";
import Cookies from "universal-cookie";
import { observer, inject } from "mobx-react";

const cookies = new Cookies();

cookies.set("cookieID", "1", { path: "/" });

const App = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.handleLogin();
    }, []);

    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/basket" component={Basket} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={ValidatedFormLogin} />
          <Route path="/signup" component={ValidatedSignup} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    );
  })
);

export default withRouter(App);
