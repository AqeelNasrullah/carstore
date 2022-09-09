import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";
import Error404 from "./Error404";

let min_down_payment;

const Lease = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [months, setMonths] = useState(null);
  const [years, setYears] = useState(null);
  const [Installments, setInstallments] = useState(null);
  // const [remaining, setRemaining] = useState(null);
  const [remainingWithInterest, setRemainingWithInterest] = useState(null);
  const [price, setPrice] = useState(null);
  const [downPayment, setDownPayment] = useState(null);

  const history = useHistory();

  const validationHandler = (values) => {
    const errors = {};

    if (values.down_payment === "") {
      errors.down_payment = "This field is required.";
    } else if (parseInt(values.down_payment) < min_down_payment) {
      errors.down_payment = `Down payment should be atleast 20% (PKR ${min_down_payment} /-) of car price.`;
    }

    if (values.installment_years === "") {
      errors.installment_years = "This field is requried.";
    } else if (parseInt(values.installment_years) > 7) {
      errors.installment_years = "You can add upto 7 installment years.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      car_price: car?.price,
      down_payment: min_down_payment,
      installment_years: "",
    },
    validate: validationHandler,
    onSubmit: (values) => {
      const months = 12 * parseInt(values.installment_years);
      const remaining =
        parseInt(values.car_price) - parseInt(values.down_payment);
      const remainingWithInterest =
        remaining + Math.round((18 / 100) * parseInt(remaining));
      const installments = remainingWithInterest / months;
      setDownPayment(values.down_payment);
      setInstallments(installments);
      setMonths(months);
      setPrice(values.car_price);
      // setRemaining(remaining);
      setRemainingWithInterest(remainingWithInterest);
      setYears(values.installment_years);
      setCalculated(true);
    },
  });

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

  useEffect(() => {
    min_down_payment = Math.round((20 / 100) * car?.price);
    formik.setFieldValue("car_price", car?.price);
    formik.setFieldValue("down_payment", min_down_payment);
  }, [car]);

  if (loading) {
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );
  } else if (!car) {
    return <Error404 />;
  }

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>
          Installments - {`${car?.brand} ${car?.title} ${car?.model}`} -{" "}
          {app.name}
        </title>
      </Helmet>
      <div className="page">
        <div
          className="viewCarSection"
          style={{
            backgroundImage: `url('${app.serverUrl}/assets/images/${car.coverImage}')`,
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
                <h3>
                  {car?.brand} {car?.title} {car?.model}
                </h3>
                <h5>Year: {car?.year}</h5>
              </div>
              <hr />
              <h3>Calculate Installments:</h3>
              <form noValidate onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <label>Car Price:</label>
                    <input
                      className="form-control"
                      type="text"
                      {...formik.getFieldProps("car_price")}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Down Payment:</label>
                    <input
                      className="form-control"
                      type="text"
                      {...formik.getFieldProps("down_payment")}
                    />
                    {formik.errors.down_payment && (
                      <p
                        className="text-danger mb-0"
                        style={{ fontSize: "12px" }}
                      >
                        <span className="lnr lnr-warning"></span>{" "}
                        {formik.errors.down_payment}
                      </p>
                    )}
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Installment Years:</label>
                    <input
                      className="form-control"
                      type="text"
                      {...formik.getFieldProps("installment_years")}
                    />
                    {formik.errors.installment_years && (
                      <p
                        className="text-danger mb-0"
                        style={{ fontSize: "12px" }}
                      >
                        <span className="lnr lnr-warning"></span>{" "}
                        {formik.errors.installment_years}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary" type="submit">
                    Calculate
                  </button>
                </div>
              </form>
              {calculated && (
                <>
                  <hr />
                  <div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        backgroundColor: "#efefef",
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">Original Car Price</p>
                      <p className="mb-0">PKR {price} /-</p>
                    </div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">Down Payment</p>
                      <p className="mb-0">PKR {downPayment} /-</p>
                    </div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        backgroundColor: "#efefef",
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">Payment Duration</p>
                      <p className="mb-0">
                        {years} Years ({months} Months)
                      </p>
                    </div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">Interest Rate</p>
                      <p className="mb-0">18%</p>
                    </div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        backgroundColor: "#efefef",
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">
                        Remaining Amount Payable within {years} Years/{months}{" "}
                        Months
                      </p>
                      <p className="mb-0">PKR {remainingWithInterest} /-</p>
                    </div>
                    <div
                      className="d-flex align-item-center justify-content-between"
                      style={{
                        padding: "15px",
                      }}
                    >
                      <p className="mb-0">Installment Amount per Month</p>
                      <p className="mb-0">PKR {Installments.toFixed(2)} /-</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      onClick={goBackHandler}
                    >
                      Go Back
                    </button>
                    <Link to="/contact" className="btn btn-primary">
                      Order
                    </Link>
                  </div>
                </>
              )}
              <hr />
              <p className="text-center mb-0">
                Copyrights &copy; {new Date().getFullYear()} - All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lease;
