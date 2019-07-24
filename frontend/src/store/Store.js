import { observable, computed, action } from "mobx";

class Store {

    number = 7;

    get count() {
        return this.number;
    }

    decorate(Store,{
        number: observable
    })
}

export default Store;