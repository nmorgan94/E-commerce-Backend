import { observable, computed, action, configure } from "mobx";

//configure({ enforceActions: 'observed' })

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
}

export default new DataStore();
