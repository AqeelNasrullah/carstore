import React from "react";
import { Link } from "react-router-dom";
import app from "../config/app";

const CarSection = ({ id, image, brand, title, model, price, description }) => {
  return (
    <div
      className="glide__slide slide-item"
      style={{
        backgroundImage:
          "url('" + app.serverUrl + "/assets/images/" + image + "')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="slide-item-inner">
        <div>
          <h1 className="text-brand text-light logo">Car Store</h1>
        </div>
        <div className="slide-item-detail">
          <h5 className={model ? "slide-item--brand" : "slide-item--model"}>
            {brand} {title}
          </h5>
          <h3 className="slide-item--model">{model}</h3>
          <h6 className="text-light">Pkr {price} /-</h6>
          {description && (
            <p className="slide-item--description">
              {description.slice(0, 255)}...
            </p>
          )}
          <div className="slide-item-btn-container mb-3">
            <Link to={`/${id}/order`} className="btn btn-primary">
              Direct Order
            </Link>
            <Link to={`/${id}`} className="btn btn-secondary">
              View More
            </Link>
          </div>
          <p className="mb-2 text-center">
            <Link to="/privacy-policy" className="text-light">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/contact" className="text-light">
              Contact Us
            </Link>
          </p>
          <p className="mb-0 text-center">
            Copyright &copy; {new Date().getFullYear()} - All Rights Reserved by{" "}
            <a href="/">Car Store</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarSection;
