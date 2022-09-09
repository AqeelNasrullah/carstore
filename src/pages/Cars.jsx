import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import DashboardHeader from "../components/DashboardHeader";
import Loading from "../components/Loading";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";

const Cars = () => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState();

  const activeHandler = async (id) => {
    await apiCall
      .get("/cars/active/" + id)
      .then((resp) => {
        if (resp) {
          window.location.reload();
        }
      })
      .catch((err) =>
        setAlert(err.response?.data ? err.response?.data?.message : err.message)
      );
  };

  const deleteHandler = async (id) => {
    await apiCall
      .delete("/cars/delete/" + id)
      .then((resp) => {
        if (resp) {
          window.location.reload();
        }
      })
      .catch((err) =>
        setAlert(err.response?.data ? err.response?.data?.message : err.message)
      );
  };

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
            err.response?.data ? err.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getCars();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cars - {app.name}</title>
      </Helmet>
      <div className="page">
        <DashboardHeader />
        <div className="p-3">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h3 className="mb-0">Cars</h3>
              <Link
                to="/cars/add"
                className="btn btn-primary"
                style={{ width: "100px" }}
              >
                Add Car
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-light bg-secondary">
                    <td style={{ width: "10px" }}>Sr#</td>
                    <td style={{ width: "125px" }}>Image</td>
                    <td style={{ width: "150px" }}>Brand</td>
                    <td style={{ width: "150px" }}>Title</td>
                    <td style={{ width: "150px" }}>Model</td>
                    <td style={{ width: "75px" }}>Year</td>
                    <td style={{ width: "150px" }}>Price</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={8} className="text-center">
                        <Loading />
                      </td>
                    </tr>
                  )}
                  {cars?.length < 1 ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No car to show.
                      </td>
                    </tr>
                  ) : (
                    cars?.map((car, index) => (
                      <tr>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle">
                          <img
                            src={`${app.serverUrl}/assets/images/${car?.coverImage}`}
                            alt="Not found"
                            width="100%"
                          />
                        </td>
                        <td className="align-middle">{car?.brand}</td>
                        <td className="align-middle">{car?.title}</td>
                        <td className="align-middle">{car?.model}</td>
                        <td className="align-middle">{car?.year}</td>
                        <td className="align-middle">PKR {car?.price} /-</td>
                        <td className="align-middle">
                          {car?.isDeleted ? (
                            <p className="mb-0 text-center">
                              <Badge color="danger" className="mb-2">
                                Deleted
                              </Badge>
                              <br />
                              <Link
                                to={"/cars/" + car?.id + "/view"}
                                className="text-primary me-3"
                              >
                                <i class="fa-solid fa-pen-to-square"></i>
                              </Link>{" "}
                              <Link
                                className="text-success"
                                onClick={() => activeHandler(car?.id)}
                              >
                                <i class="fa-solid fa-square-check"></i>
                              </Link>
                            </p>
                          ) : (
                            <p className="mb-0 text-center">
                              <Link
                                to={"/cars/" + car?.id + "/view"}
                                className="text-primary me-3"
                              >
                                <i class="fa-solid fa-pen-to-square"></i>
                              </Link>{" "}
                              <Link
                                className="text-danger"
                                onClick={() => deleteHandler(car?.id)}
                              >
                                <i class="fa-solid fa-trash"></i>
                              </Link>
                            </p>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cars;
