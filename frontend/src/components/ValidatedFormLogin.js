import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import { login } from '../utils/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import { Link } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const ValidatedLoginForm = (props) => (
  <Formik
    initialValues={{ usernameOrEmail: "", password: "" }}
    onSubmit={(values) => {
        const loginRequest = JSON.stringify(values);

        login(loginRequest)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        })
        .then(props.history.push(`/`));
    }}


    validationSchema={Yup.object().shape({
      usernameOrEmail: Yup.string()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
       // .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <MuiThemeProvider>
            <div>
        <form onSubmit={handleSubmit}>

        <p>Please login or <Link to="/signup">signup</Link> </p>
        
       
          <Input
            name="usernameOrEmail"
            type="text"
            placeholder="Enter your email"
            value={values.usernameOrEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            disableUnderline = {true}
            className={errors.email && touched.email && "error"}
          />
          {errors.usernameOrEmail && touched.usernameOrEmail && (
            <div className="input-feedback">{errors.usernameOrEmail}</div>
          )}
           <br/>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
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
        <br/>
          <button class="btn waves-effect waves-light" type="submit" disabled={isSubmitting}>
            Login
          </button>

        </form>
        </div>
        </MuiThemeProvider>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm;
