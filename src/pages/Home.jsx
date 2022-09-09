import Glide from "@glidejs/glide";
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CarSection from "../components/CarSection";
import Loading from "../components/Loading";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";
// import cars from "../data/dummy-data";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (cars.length > 1) {
      new Glide(document.getElementById("glide"), {
        type: "carousel",
        autoplay: 10000,
        perView: 1,
        gap: 0,
        startAt: 0,
      }).mount();
    }
  }, [cars]);

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      await apiCall
        .get("/cars")
        .then((resp) => {
          setCars(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setAlert(
            err.response?.data ? err?.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getCars();
  }, []);

  if (loading)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{app.name}</title>
      </Helmet>
      <div>
        {cars.length > 0 ? (
          <div className="glide" id="glide">
            <div className="glide__track" data-glide-el="track">
              <div className="glide__slides">
                {cars?.map((car, index) => (
                  <CarSection
                    key={index}
                    id={car.id}
                    image={car.coverImage}
                    brand={car.brand}
                    title={car.title}
                    model={car.model}
                    price={car.price}
                    description={car.description}
                  />
                ))}
              </div>
              <div className="glide__arrows" data-glide-el="controls">
                <button
                  className="glide__arrow glide__arrow--left"
                  data-glide-dir="<"
                >
                  <span className="lnr lnr-chevron-left"></span>
                </button>
                <button
                  className="glide__arrow glide__arrow--right"
                  data-glide-dir=">"
                >
                  <span className="lnr lnr-chevron-right"></span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 page d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-brand text-center">Car Store</h1>
            <h5>No car added yet.</h5>
            <p>In case of any query:</p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
