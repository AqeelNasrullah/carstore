import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import app from "../config/app";

const Error404 = () => {
  const history = useHistory();
  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>404 | Not Found | {app.name}</title>
      </Helmet>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1 style={{ fontSize: "125px" }} className="mb-0">
          <span className="lnr lnr-sad"></span>
        </h1>
        <h2>Error 404</h2>
        <h5>Page Not Found</h5>
        <p>The page you requested is not available on server.</p>
        <button
          className="btn btn-primary"
          style={{ maxWidth: "125px" }}
          onClick={goBackHandler}
        >
          <span className="lnr lnr-chevron-left"></span> Go back
        </button>
      </div>
    </>
  );
};

export default Error404;
