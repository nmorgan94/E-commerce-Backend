import React, { Component } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import { login } from '../utils/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import { Link } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class ValidatedLoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      badCredentials: false,

    }
  }


  handleErrors = (response) => {
  
    if(response.message == "Bad credentials"){
      this.setState({
        badCredentials: true
      });
    } 
    else{
      this.setState({
        badCredentials: false
      });
      this.props.history.push(`/`);
    }

};


  render() {
    return (
        

  <Formik
    initialValues={{ 
      usernameOrEmail: "", password: "" 
    }}
    onSubmit={(values) => {
        const loginRequest = JSON.stringify(values);

        login(loginRequest)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          this.props.history.push(`/`);
        }).catch(error => {
          if(error.status === 401) {
              this.setState({
                badCredentials: true
              });
            } 
          })
  }
}


    validationSchema={Yup.object().shape({
      usernameOrEmail: Yup.string()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")

    })}
  
 
      render={({ errors, touched, handleSubmit, values, handleChange, handleBlur}) => (
        <MuiThemeProvider>
            <div>
        <form onSubmit={handleSubmit}>

        <p>Please login or <Link to="/signup">signup</Link> </p>
        
       
          <Input
            name="usernameOrEmail"
            type="text"
            placeholder="Username or Email"
            value={values.usernameOrEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.usernameOrEmail && touched.usernameOrEmail && "error"}
          />
          {errors.usernameOrEmail && touched.usernameOrEmail && (
            <div className="input-feedback">{errors.usernameOrEmail}</div>
          )}
           <br/>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
        <br/>

        {this.state.badCredentials == true && 
          <div className="input-feedback">Incorrect username or password</div>
        }
        <br/>



          <button class="btn waves-effect waves-light" type="submit">
            Login
          </button>

        </form>
        </div>
        </MuiThemeProvider>
    

    )} 
  />
  )
}
}

export default ValidatedLoginForm;
