import React from "react";
import { observer, inject } from "mobx-react";

export const BasketList = inject("dataStore")(
  observer(({ dataStore }) => {
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

    return <div>{items}</div>;
  })
);
