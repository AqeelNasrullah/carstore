import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import app from "../config/app";

const Contact = () => {
  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - {app.name}</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-center flex-column page p-3">
        <h1 className="text-center text-brand">Car Store</h1>
        <div className="card contact-card mx-auto mb-3">
          <h3 className="text-center">Contact us at:</h3>
          <p className="text-center">
            <i class="fa-solid fa-envelope"></i> carstore160@gmail.com
          </p>
          {/* <p className="text-center">
          <i class="fa-solid fa-phone"></i> 0310 0777163
        </p> */}
          <p className="text-center">
            <i class="fa-brands fa-square-whatsapp"></i> 0310 0777163
          </p>
          <h3 className="text-center">Visit us here:</h3>
          <p className="text-center">
            <i class="fa-solid fa-location-dot"></i> Office # 3, First Floor
            Jaan Plaza, Opp. DHA Phase 2, G.T. Road Islamabad
          </p>
        </div>
        <button className="btn btn-secondary mx-auto" onClick={goBackHandler}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default Contact;
