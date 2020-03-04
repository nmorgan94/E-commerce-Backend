import React, { Component } from "react";
import { getCurrentUser } from "../utils/APIUtils";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { observer, inject } from "mobx-react";

@inject("dataStore")
@observer
class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {}

  render() {
    const isLogged = localStorage.getItem(ACCESS_TOKEN);
    console.log("logged: " + isLogged);
    if (!isLogged) {
      return <Redirect to="/basket" />;
    }
    return (
      <div className="container">
        <h3>Checkout</h3>
      </div>
    );
  }
}

export default Checkout;
