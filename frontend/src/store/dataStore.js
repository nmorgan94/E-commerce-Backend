import { observable, action } from "mobx";
import { ACCESS_TOKEN } from "../constants";
import Cookies from "universal-cookie";

//configure({ enforceActions: 'observed' })

const cookies = new Cookies();

let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost";
let API_BASE_PORT = process.env.REACT_APP_API_PORT || "8080";

class DataStore {
  @observable isAuthenticated = false;

  @observable currentUser = {};

  @observable basket = {};

  @observable basketContent = [];

  @observable products = [];

  @observable productDetail = {};

  @action handleLogin = () => {
    this.getCurrentUser().then(response => {
      this.currentUser = response;
      this.isAuthenticated = true;
    });
  };

  @action handleLogoutState = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.isAuthenticated = false;
    this.currentUser = {};
  };

  @action request = options => {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };

  @action getBasket = () => {
    let id = cookies.get("cookieID");
    fetch(API_BASE_URL + ":" + API_BASE_PORT + `/basket/baskets/${id}`)
      .then(response => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.basket = data;
        console.log("this basket" + this.basket);
        this.basketContent = data.basketContent;
      });
  };

  @action getProductDetail = id => {
    fetch(API_BASE_URL + ":" + API_BASE_PORT + `/products/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data: " + data);
        this.productDetail = data;
      })
      .catch(() => console.log("Products api call failed"));
  };

  @action getProducts = () => {
    fetch(API_BASE_URL + ":" + API_BASE_PORT + "/products")
      .then(response => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then(data => (this.products = data))
      .catch(() => console.log("Products api call failed"));
  };

  @action getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }

    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/user/me",
      method: "GET"
    });
  };

  @action login = loginRequest => {
    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signin",
      method: "POST",
      body: loginRequest
    });
  };

  @action signup = signupRequest => {
    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signup",
      method: "POST",
      body: signupRequest
    });
  };
}

export default new DataStore();
