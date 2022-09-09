import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";
import cars from "../data/dummy-data";
import Error404 from "./Error404";

const ViewCar = ({
  match: {
    params: { id },
  },
}) => {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);

  const history = useHistory();

  const goBackHandler = () => {
    history.goBack();
  };

  const convertStringToHTML = function (str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body;
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

  return (
    <>
      <Helmet>
        <title>
          {`${car?.brand} ${car?.title} ${car?.model}`} - {app.name}
        </title>
      </Helmet>
      <div className="page">
        <div
          className="viewCarSection"
          style={{
            backgroundImage: `url('${app.serverUrl}/assets/images/${car?.coverImage}')`,
          }}
        >
          <div className="viewCarSectionInner">
            <div className="goBackArrowContainer">
              <p className="goBackArrow" onClick={goBackHandler}>
                <i className="lnr lnr-arrow-left"></i>
              </p>
              <h1 className="text-center text-brand text-light">Car Store</h1>
            </div>
          </div>
          <div className="p-3">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
                <div className="carInfo">
                  <h1>
                    {car?.brand} {car?.title} {car?.model}
                  </h1>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "100px" }}
                  >
                    <h4>Year: {car?.year}</h4>
                    <h5>Price: PKR {car?.price} /-</h5>
                  </div>
                </div>
                <div
                  className="carButtons"
                  style={{ maxWidth: "200px", width: "100%" }}
                >
                  <Link
                    to={`/${car?.id}/order`}
                    className="btn btn-primary mb-1"
                  >
                    Order Now
                  </Link>
                  <br />
                  <Link to={`/${car?.id}/lease`} className="btn btn-secondary">
                    On Lease
                  </Link>
                </div>
              </div>
              <hr />
              <p>{car?.description}</p>
              <hr />
              <div>
                <h3>Gallery</h3>
                <div
                  className="d-flex justify-content-center"
                  style={{ gap: "20px", flexWrap: "wrap" }}
                >
                  {car?.gallery.map((img, index) => (
                    <div
                      style={{
                        minWidth: "200px",
                        maxWidth: "200px",
                        minHeight: "200px",
                        maxHeight: "200px",
                        overflow: "hidden",
                      }}
                      key={index}
                    >
                      <img
                        src={`${app.serverUrl}/assets/images/${img.name}`}
                        alt="Not found"
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
                <hr />
                <div>
                  <h3>Specifications</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: car?.specifications }}
                  >
                    {/* {car?.specifications} */}
                  </div>
                </div>
                <hr />
                <p className="text-center m-0">
                  Coprights &copy; {new Date().getFullYear()} - All Rights
                  Resered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCar;
