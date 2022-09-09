import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";
import Error404 from "./Error404";

const Order = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);

  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    const getCar = async () => {
      setLoading(true);
      await apiCall
        .get("/cars/" + id)
        .then((resp) => {
          setCar(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setAlert(
            err.response?.data ? err?.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getCar();
  }, [id]);

  if (loading)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );

  if (!car) return <Error404 />;

  return (
    <>
      <Helmet>
        <title>
          Order - {`${car?.brand} ${car?.title} ${car?.model}`} - {app.name}
        </title>
      </Helmet>
      <div className="page p-3">
        <div className="goBackArrowContainer mb-4">
          <p className="goBackArrow" onClick={goBackHandler}>
            <i className="lnr lnr-arrow-left"></i>
          </p>
          <h1 className="text-center text-brand">Car Store</h1>
          <h5 className="text-center">Order Details</h5>
        </div>
        <div className="container">
          <div className="mb-4">
            <h5 className="mb-0">Car Store Pakistan</h5>
            <p className="mb-0">Phone: +92 310 0777163</p>
            <p className="mb-0">Email: carstore160@gmail.com</p>
            <p className="mb-0">
              Address: Office # 3, First Floor Jaan Plaza, Opp. DHA Phase 2,
              G.T. Road Islamabad
            </p>
          </div>
          <div className="mb-4">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Image</th>
                    <th>Brand</th>
                    <th>Car</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-middle">1</td>
                    <td className="align-middle">
                      <img
                        src={`${app.serverUrl}/assets/images/${car?.coverImage}`}
                        alt="Not found"
                        width="100px"
                      />
                    </td>
                    <td className="align-middle">{car?.brand}</td>
                    <td className="align-middle">{car?.title}</td>
                    <td className="align-middle">{car?.model}</td>
                    <td className="align-middle">{car?.year}</td>
                    <td className="align-middle">PKR {car?.price} /-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div style={{ float: "right" }}>
              <div className="d-flex align-items-centers">
                <div style={{ paddingRight: "30px" }}>
                  <p>Total Amount:</p>
                </div>
                <div>
                  <p>PKR {car?.price} /-</p>
                </div>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <button className="btn btn-secondary" onClick={goBackHandler}>
                  Go Back
                </button>
                <Link to="/contact" className="btn btn-primary">
                  Confirm
                </Link>
              </div>
              <br style={{ clear: "both" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
