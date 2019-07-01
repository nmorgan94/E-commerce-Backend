import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants';

 class Navbar extends Component {
    constructor(props) {
        super(props);   
        this.handleLogout = this.handleLogout.bind(this);  
    }

    handleLogout() {
        this.props.onLogout();
    }

render(){

        return(
            <nav>
                <div className="nav-wrapper blue-grey">
                    <div className="container">
                        <Link to="/" className="brand-logo">e-com</Link>                    
                        <ul className="right">
                        
                        <li> {this.props.currentUser ? <span onClick={this.handleLogout}>logout</span> : <Link to="/login">login</Link> }	</li>
                            <li><Link to="/basket"><i className="material-icons">shopping_cart</i></Link></li>
                        </ul>
                    </div>
                </div>  
            </nav>
        )
    }

 }

export default Navbar;