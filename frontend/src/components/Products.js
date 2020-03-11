import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

export const Products = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getProducts();
    }, []);

    const listItems = dataStore.products.map(item => (
      <div className="card red" key={item.id}>
        <div className="col s12 m4 l4">
          <Link to={`/products/${item.id}`}>
            <div className="card-image">
              <img src={item.pictureUrl} alt={item.name} />
              <span className="card-title">{item.name}</span>
            </div>
            <div className="card-content white">
              <p>
                <b>Price: {item.price}$</b>
              </p>
            </div>
          </Link>
        </div>
      </div>
    ));

    return (
      <div className="container white">
        <div className="row">
          <div className="">{listItems}</div>
        </div>
      </div>
    );
  })
);
