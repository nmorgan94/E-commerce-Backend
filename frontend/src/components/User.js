import React, { Component } from "react";
import { getCurrentUser } from "../utils/APIUtils";
import { observer, inject } from "mobx-react";

@inject("dataStore")
@observer
class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    getCurrentUser().then(response => {
      this.props.dataStore.currentUser = response;
    });
  };

  render() {
    return (
      <div className="container">
        <h3>
          {this.props.dataStore.isAuthenticated ? (
            <div>
              <p>{this.props.dataStore.currentUser.firstName}</p>
            </div>
          ) : (
            <p>Not Signed In</p>
          )}
        </h3>
      </div>
    );
  }
}

export default User;
