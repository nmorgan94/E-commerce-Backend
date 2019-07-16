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

class ValidatedSignup extends Component{
  constructor(props){
    super(props);
    this.state = {
      userNameExists: false,
      emailExists: false
    }
  }

  handleErrors = (response) => {
  
    console.log("Error"+response.message)
    if(response.message == "Username is already taken!"){
      this.setState({
        usernameExists: true,
        emailExists: false
      });
    } 
    if(response.message == "Email is already taken!"){
      this.setState({
        usernameExists: false,
        emailExists: true
      });
    } 
    else{
      this.setState({
        usernameExists: false,
        emailExists: false
      });
    }

};


  render() {
    return (
        
  <Formik
    initialValues={{
      name: "", username: "", email: "", password: "" 
    }}
    onSubmit= {(values) => {
      const signupRequest = JSON.stringify(values);

      fetch(`/api/auth/signup`, {
          headers: {
              'Content-Type': 'application/json',
          },
          method: 'POST',
          body: signupRequest
      }).then(res => res.json())
      .then(this.handleErrors);
    }
  }


    validationSchema={Yup.object().shape({
      name: Yup.string()
        .required("Required"),
      username: Yup.string()
        .required("Required"),
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required('Password confirm is required')

    }
    )
  }

        render={({ errors, touched, handleSubmit, values, handleChange, handleBlur}) => (
        <MuiThemeProvider>
        <div>
        <form onSubmit={handleSubmit}>
        <br/>
        <Input
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.name && touched.name && "error"}
          />
          {errors.name && touched.name && (
            <div className="input-feedback">{errors.name}</div>
          )}
        <br/>
        <Input
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.username && touched.username && "error"}
          />
          {errors.username && touched.username && (
            <div className="input-feedback">{errors.username}</div>
          )} 

          {this.state.usernameExists == true && 
          <div className="input-feedback">Username already exsists</div>
          }
         
       <br/>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
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

          {this.state.emailExists == true && 
          <div className="input-feedback">Email already exsists</div>
          }
          <br/>
          <Input
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.passwordConfirm && touched.passwordConfirm && "error"}
          />
          {errors.passwordConfirm && touched.passwordConfirm && (
            <div className="input-feedback">{errors.passwordConfirm}</div>
          )}
        <br/>
        <br/>
          <button className="btn waves-effect waves-light" type="submit" >
            Register
          </button>

        </form>
        </div>
        </MuiThemeProvider>
      
      )}
      />
  )
}
}

  

export default ValidatedSignup;
