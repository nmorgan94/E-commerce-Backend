import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants';
import { login } from '../utils/APIUtils';
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

console.log("token "+ACCESS_TOKEN);

class Login extends Component {
constructor(props){
    super(props);
    this.state={
    usernameOrEmail: {
        value: ''
    },
    password: {
        value: ''
    }
  }
}

 handleClick = (event) => {  
    
  const loginRequest = JSON.stringify(this.state);

  login(loginRequest)
  .then(response => {
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
    this.props.onLogin();
  })
  .then(this.props.history.push(`/`));

}

setLocalStorage = (result, key) => {
  localStorage.setItem(result, key);
};

handleChange = (evt) => {
  this.setState({ [evt.target.name]: evt.target.value });
}


render() {

    return (
      <Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in", values);
      setSubmitting(false);
    }, 500);
  }}
>
        <MuiThemeProvider>
          <div>

            <p>Please login or <Link to="/signup">signup</Link> </p>

           <Input
             placeholder = "Username or Email"
             name="usernameOrEmail"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
           <br/>
           <Input
             placeholder = "Password"
             name="password"
             type = "password"
             disableUnderline = {true}
             onChange={this.handleChange}
             />
           <br/>
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </Formik>
    );
  }
}
const style = {
 margin: 25,
};
export default Login;