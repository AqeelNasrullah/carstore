import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet-async";
import app from "../config/app";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import apiCall from "../config/apiCall";
import { setAlert } from "../config/helpers";
import { useAuth } from "../contexts/auth-context";

const Login = () => {
  const history = useHistory();
  const { changeAuthState } = useAuth();

  const loginHandler = async (values) => {
    await apiCall
      .post("/auth/login", values)
      .then((resp) => {
        changeAuthState(true);
        history.push("/cars");
      })
      .catch((err) => {
        setAlert(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid.")
        .required("This field is required."),
      password: Yup.string()
        .min(6, "Password should be atleast 6 characters longs.")
        .max(16, "Password should be maximum 16 characters longs.")
        .required("This field is required."),
    }),
    onSubmit: loginHandler,
  });

  return (
    <>
      <Helmet>
        <title>Login - {app.name}</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-center flex-column page p-3">
        <h1 className="text-center text-brand">Car Store</h1>
        <div className="card contact-card mx-auto mb-3">
          <h3 className="text-center">Admin Login</h3>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && (
                <p className="text-danger" style={{ fontSize: "12px" }}>
                  <span className="lnr lnr-warning"></span>{" "}
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && (
                <p className="text-danger" style={{ fontSize: "12px" }}>
                  <span className="lnr lnr-warning"></span>{" "}
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ maxWidth: "125px", float: "right" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
