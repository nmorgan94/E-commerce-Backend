import React, { Component } from "react";
import Cookies from "universal-cookie";
import { API_BASE_URL } from "../constants";
import { observer, inject } from "mobx-react";

const cookies = new Cookies();

@inject("dataStore")
@observer
class Basket extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.getBasket();
  }

  getBasket = () => {
    let id = cookies.get("cookieID");
    fetch(API_BASE_URL + `/basket/baskets/${id}`)
      .then(response => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then(data => {
        this.props.dataStore.basket = data;
        this.props.dataStore.basketContents = data.basketContent;
      });
  };

  render() {
    let subTotal = this.props.dataStore.basket.basketPrice;

    let listItems = this.props.dataStore.basketContents.map(item => {
      console.log("item: ", item.product.id);

      return (
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
      );
    });

    return (
      <div className="container grey">
        <div className="box">{listItems}</div>
        <div className="">Subtotal: £{subTotal}</div>
      </div>
    );
  }
}

export default Basket;
