import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import app from "../config/app";

const PrivacyPolicy = () => {
  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy - {app.name}</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-center flex-column page p-3">
        <h1 className="text-center text-brand">Car Store</h1>
        <div className="card contact-card mx-auto mb-3">
          <h4>Privacy Policy:</h4>
          <p>
            One of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information collected and
            recorded by Carstore Pakistan and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors of our website with regards to the information
            that they share and/or collect on Carstore Pakistan. This policy
            does not apply to any information collected offline or via channels
            other than this website. Our Privacy Policy was created with the
            help of the Privacy Policy Generator and the Free Privacy
            Policy Generator.
          </p>
        </div>
        <button className="btn btn-secondary mx-auto" onClick={goBackHandler}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default PrivacyPolicy;
