import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
import { observer, inject } from "mobx-react";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Required"),
  password: Yup.string().required("No password provided.")
});

@inject("dataStore")
@observer
class ValidatedLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badCredentials: false
    };
  }

  render() {
    return (
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: ""
        }}
        onSubmit={values => {
          const loginRequest = JSON.stringify(values);

          this.props.dataStore
            .login(loginRequest)
            .then(response => {
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              this.props.dataStore.handleLogin();
              this.props.history.push(`/`);
            })
            .catch(error => {
              console.log(error);
              if (error.status === 401) {
                this.setState({
                  badCredentials: true
                });
              }
            });
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <p>
              Please login or <Link to="/signup">signup</Link>{" "}
            </p>

            <Input
              name="usernameOrEmail"
              type="text"
              placeholder="Username or Email"
              value={values.usernameOrEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              disableUnderline={true}
              className={
                errors.usernameOrEmail && touched.usernameOrEmail && "error"
              }
            />
            {errors.usernameOrEmail && touched.usernameOrEmail && (
              <div className="input-feedback">{errors.usernameOrEmail}</div>
            )}
            <br />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disableUnderline={true}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
            <br />

            {this.state.badCredentials ? (
              <div className="input-feedback">
                Incorrect username or password
              </div>
            ) : null}
            <br />

            <button className="btn waves-effect waves-light" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ValidatedLoginForm;
