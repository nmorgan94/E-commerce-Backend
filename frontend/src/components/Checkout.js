import React from "react";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { AddressDetails } from "./AddressDetails";
import { BasketDetails } from "./BasketDetails";

export const Checkout = () => {
  const isLogged = localStorage.getItem(ACCESS_TOKEN);
  console.log("logged: " + isLogged);
  if (!isLogged) {
    return <Redirect to="/basket" />;
  }
  return (
    <div>
      <h1>Checkout</h1>

      <div className="row">
        <div className="col s3 ">
          <BasketDetails />
        </div>
        <div className="col s9 ">
          <AddressDetails />
        </div>
      </div>
    </div>
  );
};
