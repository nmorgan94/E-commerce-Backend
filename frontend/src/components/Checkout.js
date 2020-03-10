import React, { Component } from "react";
import { getCurrentUser } from "../utils/APIUtils";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { observer, inject } from "mobx-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddressDetails } from "./AddressDetails";
import { BasketDetails } from "./BasketDetails";
import Box from "@material-ui/core/Box";

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
