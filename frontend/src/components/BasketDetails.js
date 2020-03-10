import React from "react";
import { observer, inject } from "mobx-react";

export const BasketDetails = inject("dataStore")(
  observer(({ dataStore }) => {
    dataStore.getBasket();

    return <h1>{dataStore.basket.basketPrice}</h1>;
  })
);
