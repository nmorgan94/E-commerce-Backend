import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@material-ui/core/Input";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

export const AddressDetails = () => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      postcode: ""
    }}
    validationSchema={validationSchema}
    onSubmit={values => {
      console.log(values);
      alert("This is a mock order! click ok to redirect to homepage");
      window.location.href = "/";
    }}
  >
    {({ errors, touched, values, handleChange, handleBlur }) => (
      <Form>
        <Input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          disableUnderline={true}
          className={errors.firstName && touched.firstName && "error"}
        />
        {errors.firstName && touched.firstName ? (
          <div>{errors.firstName}</div>
        ) : null}
        <br />
        <Input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          disableUnderline={true}
          className={errors.lastName && touched.lastName && "error"}
        />
        {errors.lastName && touched.lastName ? (
          <div>{errors.lastName}</div>
        ) : null}
        <br />
        <Input
          name="address1"
          type="text"
          placeholder="Address"
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
          disableUnderline={true}
          className={errors.address1 && touched.address1 && "error"}
        />
        {errors.address1 && touched.address1 ? (
          <div>{errors.address1}</div>
        ) : null}
        <br />
        <Input
          name="city"
          type="text"
          placeholder="City"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          disableUnderline={true}
          className={errors.city && touched.city && "error"}
        />
        {errors.city && touched.city ? <div>{errors.city}</div> : null}
        <br />
        <Input
          name="postcode"
          type="text"
          placeholder="Postcode"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          disableUnderline={true}
          className={errors.postcode && touched.postcode && "error"}
        />
        {errors.postcode && touched.postcode ? (
          <div>{errors.postcode}</div>
        ) : null}
        <br />
        <button type="submit">Pay Now</button>
      </Form>
    )}
  </Formik>
);
