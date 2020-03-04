import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { observer, inject } from "mobx-react";

@inject("dataStore")
@observer
class Products extends Component {
  constructor() {
    super();
  }

  getProducts = () => {
    fetch(API_BASE_URL + "/products")
      .then(response => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then(data => (this.props.dataStore.products = data))
      .catch(() => console.log("Products api call failed"));
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const data = this.props.dataStore.products;
    let listItems = data.map(item => {
      return (
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
      );
    });

    return (
      <div className="container white">
        <div className="row">
          <div className="">{listItems}</div>
        </div>
      </div>
    );
  }
}

export default Products;
