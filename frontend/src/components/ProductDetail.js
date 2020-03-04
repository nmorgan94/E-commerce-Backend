import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { observer, inject } from "mobx-react";

const cookies = new Cookies();

@inject("dataStore")
@observer
class ProductDetail extends Component {
  constructor() {
    super();
  }

  getProductDetail = id => {
    fetch(API_BASE_URL + `/products/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.dataStore.productDetail = data;
      })
      .catch(() => console.log("Products api call failed"));
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProductDetail(id);
  }

  handleClick = event => {
    let { id } = this.props.match.params;
    fetch(API_BASE_URL + `/basket/add/${id}`, {
      method: "POST"
    }).catch(() => console.log("Add to basket api call failed"));

    this.props.history.push(`/basket`);
  };

  render() {
    return (
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col s4">
              <img
                src={this.props.dataStore.productDetail.pictureUrl}
                alt={this.props.dataStore.productDetail.name}
              />
            </div>
            <div className="col s8">
              <div className="row">
                <div className="col s12">
                  {this.props.dataStore.productDetail.name}
                </div>
                {this.props.dataStore.productDetail.price}
                <div className="col s12"></div>
              </div>
            </div>
          </div>
          <button
            className="btn waves-effect waves-teal"
            onClick={this.handleClick}
          >
            Add To Basket
          </button>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
