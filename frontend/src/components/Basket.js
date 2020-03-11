import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { API_BASE_URL } from "../constants";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Basket = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, []);

    const items = dataStore.basketContent.map(item => (
      <div className="card red" key={item.product.id}>
        <div className="">
          <div className="card-image">
            <img src={item.product.pictureUrl} alt={item.product.name} />
            <span className="card-title">{item.product.name}</span>
          </div>
          <div className="card-content row white">
            <div className="col s6">
              <b>Price: £{item.product.price}</b>
            </div>
            <div className="col s6">
              <b>Quantity: {item.quantity}</b>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="container grey">
          <div>{items}</div>
          <div className="">Subtotal: £{dataStore.basket.basketPrice}</div>
        </div>
      </div>
    );
  })
);
