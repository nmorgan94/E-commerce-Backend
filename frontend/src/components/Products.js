import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Products extends Component {
    constructor() {
        super();
        this.state = {
          products: []

        };
    }


    getProducts = () => {
        fetch('/products')
        .then(response => {
            return response.json();
        }).then(data =>{
            this.setState({products: data});

        });
        
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        const data = this.state.products;
        let listItems = data.map(item=>{
            return(

            <div className="card red" key={item.id}>
                <div className="col s4">
                <Link to={`/products/${item.id}`}>
                        <div className="card-image">
                            <img src={item.pictureUrl} alt={item.name}/>
                            <span className="card-title">{item.name}</span>
                        </div>
                        <div className="card-content white">
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                        </Link>
                </div>
            </div>

            )
        })
    
        return (
        
        <div className="container white">
           <div className="row">
            <div className="box">
                {listItems}
            </div>
          </div>
        </div>
        );
      }

    
}


export default Products;