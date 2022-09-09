import React from "react";
import { Helmet } from "react-helmet-async";
import DashboardHeader from "../components/DashboardHeader";
import app from "../config/app";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - {app.name}</title>
      </Helmet>
      <div className="page">
        <DashboardHeader />
        <div className="p-3">
          <div className="row justify-content-center">
            <div className="col-md-3 p-3">
              <div
                className="d-flex align-items-center justify-content-between border-info p-5"
                style={{ border: "2px solid", borderRadius: "7px" }}
              >
                <h1 className="mb-0" style={{ fontSize: "50px" }}>
                  <i className="fa fa-car-side text-info"></i>
                </h1>
                <div>
                  <p
                    className="mb-0 text-end"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    0
                  </p>
                  <p className="mb-0 text-end text-uppercase">Total Cars</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-3">
              <div
                className="d-flex align-items-center justify-content-between border-success p-5"
                style={{ border: "2px solid", borderRadius: "7px" }}
              >
                <h1 className="mb-0" style={{ fontSize: "50px" }}>
                  <i className="fa fa-car-side text-success"></i>
                </h1>
                <div>
                  <p
                    className="mb-0 text-end"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    0
                  </p>
                  <p className="mb-0 text-end text-uppercase">Active Cars</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-3">
              <div
                className="d-flex align-items-center justify-content-between border-danger p-5"
                style={{ border: "2px solid", borderRadius: "7px" }}
              >
                <h1 className="mb-0" style={{ fontSize: "50px" }}>
                  <i className="fa fa-car-side text-danger"></i>
                </h1>
                <div>
                  <p
                    className="mb-0 text-end"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    0
                  </p>
                  <p className="mb-0 text-end text-uppercase">Inactive Cars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
