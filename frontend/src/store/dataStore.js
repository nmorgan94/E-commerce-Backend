import { observable, computed, action, configure } from "mobx";
import { getCurrentUser } from "../utils/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { useHistory } from "react-router";

//configure({ enforceActions: 'observed' })

class DataStore {
  //const history = useHistory();

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

  @action handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.isAuthenticated = false;
    this.currentUser = {};
    //history.push("/");
  };
}

export default new DataStore();
