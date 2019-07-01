import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Redirect } from 'react-router-dom'

const cookies = new Cookies();

class ProductDetail extends Component {
    constructor() {
        super();
        this.state = { 
          productDetail : {}
         
        };
    }

    getProductDetail = (id) => {
        fetch(`/products/${id}`)
        .then(response => {
            return response.json();
        }).then(data =>{
            this.setState({productDetail: data});
        });
    }



    componentDidMount() {
        const { id } = this.props.match.params;
        this.getProductDetail(id);
        this.setState({id: this.props.match.params});
    }

    handleClick = (event) => {
        let {id} = this.state.id;
        fetch(`/basket/add/${id}`, {
            method: 'POST'
        })

        this.props.history.push(`/basket`);
    }

    render(){

        return(
        <div className="container">
            <div className="">
                <div className = "row">
                    <div className = "col s4">
                    <img src={this.state.productDetail.pictureUrl} alt={this.state.productDetail.name}/>
                    </div>
                    <div className = "col s8">
                        <div className = "row">
                            <div className = "col s12">
                                {this.state.productDetail.name}
                            </div>
                                {this.state.productDetail.price}
                            <div className = "col s12">
                            
                            </div>
                        </div>
                    </div>
                </div>
                <button className = "btn waves-effect waves-teal" onClick={this.handleClick}>Add To Basket</button>
            </div> 
        </div>
        )
    }

}

export default ProductDetail;