import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { API_BASE_URL } from "../constants";
import Cookies from "universal-cookie";
import { BasketList } from "./BasketList";

const cookies = new Cookies();

export const Basket = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, []);

    return (
      <div>
        <BasketList />
        <div className="container grey">
          <div className="">Subtotal: £{dataStore.basket.basketPrice}</div>
        </div>
      </div>
    );
  })
);
