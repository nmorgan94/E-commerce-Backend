import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { signup } from "../utils/APIUtils";
import Input from "@material-ui/core/Input";
import { observer, inject } from "mobx-react";

@inject("dataStore")
@observer
class ValidatedSignup extends Component {
  constructor(props) {
    super(props);
  }

  handleErrors = response => {
    if (response.message === "Username is already taken!") {
      console.log("ping");
      this.props.dataStore.userNameExists = true;

      console.log("ping" + this.props.dataStore.usernameExists);
    }
    if (response.message === "Email is already taken!") {
      this.props.dataStore.emailExists = true;
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          passwordConfirm: ""
        }}
        onSubmit={values => {
          const signupRequest = JSON.stringify(values);
          this.props.dataStore.userNameExists = false;
          this.props.dataStore.emailExists = false;

          signup(signupRequest)
            .then(response => {
              this.props.history.push(`/login`);
            })
            .catch(error => {
              console.log("caught");
              this.handleErrors(error);
            });
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          username: Yup.string().required("Required"),
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirm is required")
        })}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <div>
            <form>
              <br />
              <Input
                name="name"
                type="text"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disableUnderline={true}
                className={errors.name && touched.name && "error"}
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}
              <br />
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                disableUnderline={true}
                className={errors.username && touched.username && "error"}
              />
              {errors.username && touched.username && (
                <div className="input-feedback">{errors.username}</div>
              )}

              {this.props.dataStore.usernameExists === true && (
                <div className="input-feedback">Username already exsists</div>
              )}

              <br />
              <Input
                name="email"
                type="text"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disableUnderline={true}
                className={errors.email && touched.email && "error"}
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
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

              {this.props.dataStore.emailExists === true && (
                <div className="input-feedback">Email already exsists</div>
              )}
              <br />
              <Input
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                disableUnderline={true}
                className={
                  errors.passwordConfirm && touched.passwordConfirm && "error"
                }
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="input-feedback">{errors.passwordConfirm}</div>
              )}
              <br />
              <br />
              <button className="btn waves-effect waves-light" type="submit">
                Register
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
  }
}

export default ValidatedSignup;
