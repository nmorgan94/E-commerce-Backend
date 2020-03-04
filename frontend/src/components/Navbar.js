import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("dataStore")
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue-grey">
          <div className="container">
            <Link to="/" className="brand-logo">
              e-com
            </Link>
            <ul className="right">
              <li>
                {" "}
                {this.props.dataStore.isAuthenticated ? (
                  <span>Hi there {this.props.currentUser.firstName} </span>
                ) : null}{" "}
              </li>
              <li>
                {" "}
                {this.props.dataStore.isAuthenticated ? (
                  <span onClick={this.handleLogout}>logout</span>
                ) : (
                  <Link to="/login">login</Link>
                )}{" "}
              </li>
              <li>
                <Link to="/basket">
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
