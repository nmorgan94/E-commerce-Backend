import React, { useState, useEffect } from "react";
import { observable, computed, action, configure } from "mobx";
import { getCurrentUser } from "../utils/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../constants";
import Cookies from "universal-cookie";

//configure({ enforceActions: 'observed' })

const cookies = new Cookies();

class DataStore {
  @observable isAuthenticated = false;

  @observable currentUser = {};

  @observable basket = {};

  @observable basketContents = [];

  @observable products = [];

  @observable productDetail = {};

  @observable badCredentials = false;

  @observable userNameExists = false;

  @observable emailExists = false;

  @observable count = 7;

  @action getCount() {
    return this.count;
  }

  @action increment() {
    this.count++;
  }

  @action handleLogin = () => {
    getCurrentUser().then(response => {
      this.currentUser = response;
      this.isAuthenticated = true;
    });
  };

  @action handleLogoutState = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.isAuthenticated = false;
    this.currentUser = {};
  };

  @action getBasket = () => {
    useEffect(() => {
      let id = cookies.get("cookieID");
      fetch(API_BASE_URL + `/basket/baskets/${id}`)
        .then(response => {
          console.log(API_BASE_URL);
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.basket = data;
          this.basketContents = data.basketContent;
        });
    }, []);
  };
}

export default new DataStore();
