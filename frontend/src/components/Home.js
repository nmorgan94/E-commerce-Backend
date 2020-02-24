import React, { Component } from "react";
import Products from './Products';
import { observer, inject } from 'mobx-react';

class Home extends Component {   

    render(){

        return(

        <Products/>
      
        )
    }

}

export default Home;