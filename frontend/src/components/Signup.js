import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Input from '@material-ui/core/Input';

class Signup extends Component {
constructor(props){
  super(props);
  this.state = {
    name: {
        value: ''
    },
    username: {
        value: ''
    },
    email: {
        value: ''
    },
    password: {
        value: ''
    }
  }
this.handleChange = this.handleChange.bind(this);
}





handleClick = (event) => {  
    
    const signupRequest = JSON.stringify(this.state);

    fetch(`/api/auth/signup`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: signupRequest
    }).then(res => res.json())
 
}

handleChange (evt) {
     this.setState({ [evt.target.name]: evt.target.value });
  }

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

           <Input
             placeholder = "name"
             name="name"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
            <div className="input-feedback">{}</div>
           <br/>

           <Input
             placeholder = "username"
             name="username"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
            <div className="input-feedback">{}</div>
            <br/>

            <Input
             placeholder = "email"
             name="email"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
             <div className="input-feedback">{}</div>
             <br/>

            <Input
             placeholder = "password"
             name="password"
             type = "password"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
             <div className="input-feedback">{}</div>
           <br/>
            
             <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 25,
};
export default Signup;