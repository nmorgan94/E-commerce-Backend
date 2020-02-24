
import { observable, computed, action , configure} from "mobx";

configure({ enforceActions: 'observed' })

class Store {
    @observable count = 7;

    
    @action getCount(){
        return this.count;
    }

    
    @action increment(){
        this.count++
    }
}

export default new Store();