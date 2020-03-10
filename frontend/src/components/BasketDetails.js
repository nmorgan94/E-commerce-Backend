import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import Cookies from "universal-cookie";
import { observer, inject } from "mobx-react";

const cookies = new Cookies();

export const BasketDetails = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      let id = cookies.get("cookieID");
      fetch(API_BASE_URL + `/basket/baskets/${id}`)
        .then(response => {
          console.log(API_BASE_URL);
          return response.json();
        })
        .then(data => {
          console.log(data);
          dataStore.basket = data;
          dataStore.basketContents = data.basketContent;
        });
    }, []);

    return <h1>{dataStore.basket.basketPrice}</h1>;
  })
);
