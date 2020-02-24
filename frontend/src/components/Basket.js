import React, { Component } from "react";
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom'
import {API_BASE_URL} from '../constants';

const cookies = new Cookies();

class Basket extends Component {
    constructor() {
        super();
        this.state = {    
            basket: {},
            basketContents: []
        };

    }

    componentDidMount() {
        this.getBasket();
    }


    getBasket = () => {
        let id = cookies.get('cookieID');
        fetch(API_BASE_URL+`/basket/baskets/${id}`)
        .then(response => {
            console.log(API_BASE_URL);
            return response.json();
        }).then(data =>{
            this.setState({
                basket: data,
                basketContents: data.basketContent
            });
        });
        
    }

    render(){
        const basket = this.state.basket;
        const basketContent = this.state.basketContents;
        console.log("bc: ", basketContent);

        let subTotal =  basket.basketPrice;

        let listItems = basketContent.map(item=>{

            console.log("item: ",item.product.id);

            return(
            

            <div className="card red" key={item.product.id}>
                <div className="">
                
                        <div className="card-image">
                            <img src={item.product.pictureUrl} alt={item.product.name}/>
                            <span className="card-title">{item.product.name}</span>
                        </div>
                        <div className="card-content row white">
                            <div className = "col s6">
                                <b>Price: £{item.product.price}</b> 
                            </div>
                            <div className = "col s6">
                                <b>Quantity: {item.quantity}</b> 
                            </div>
                        </div>
                        
                </div>
            </div>

            )
        })
    
        return (
        
        <div className="container grey">
          
            <div className="box">
                {listItems}
                
            </div>
            <div className="">
                Subtotal: £{subTotal}
                
            </div>
         
        </div>
        );
    }

}

export default Basket;