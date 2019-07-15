import React, { Component } from "react";
import { getCurrentUser } from '../utils/APIUtils';


class User extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            currentUser: {},
            isAuthenticated: false
          }
    }

   componentDidMount(){
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true
      });
    })
   }

    render(){
    
        return(
            
            <div className="container">
               <h3>{this.state.isAuthenticated ? 
               <div >
               <p>{this.props.currentUser.firstName}</p>
               </div>
               :<p>Not Signed In</p>}</h3>
            </div>
        )
    }

}

export default User;