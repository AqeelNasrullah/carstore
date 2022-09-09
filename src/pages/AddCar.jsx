import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CarForm from "../components/CarForm";
import DashboardHeader from "../components/DashboardHeader";
import app from "../config/app";
import * as Yup from "yup";
import { setAlert } from "../config/helpers";
import apiCall from "../config/apiCall";
import { useHistory } from "react-router-dom";

const AddCar = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const history = useHistory();

  const submitHandler = async (values) => {
    const galleryImages = [];
    gallery.forEach((img) => {
      galleryImages.push(img.name);
    });
    values = { ...values, coverImage, galleryImages };
    values.year = Number(values.year);
    values.price = Number(values.price);

    await apiCall
      .post("/cars/create", values)
      .then((resp) => {
        if (resp) {
          setAlert("Car added successfully.", "success");
          history.push("/cars");
        }
      })
      .catch((err) => {
        setAlert(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      brand: "",
      title: "",
      model: "",
      year: "",
      price: "",
      description: "",
      specifications: "",
    },
    validationSchema: Yup.object({
      brand: Yup.string().required("This field is required."),
      title: Yup.string().required("This field is required."),
      model: Yup.string().optional(),
      year: Yup.string().required("This field is required."),
      price: Yup.string().required("This field is required."),
      description: Yup.string().required("This field is required."),
      specifications: Yup.string()
        .notOneOf(["<p><br></p>"], "This field is required.")
        .required("This field is required."),
    }),
    onSubmit: (values) => {
      if (!coverImage) {
        setAlert("Upload cover image.");
      } else if (!gallery || gallery.length < 1) {
        setAlert("Atleast one image is required for gallery.");
      } else {
        submitHandler(values);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Add Car - {app.name}</title>
      </Helmet>
      <div className="page">
        <DashboardHeader />
        <div className="p-3">
          <div className="container">
            <h3 className="mb-3 text-center">Add New Car</h3>
            <CarForm
              formik={formik}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              gallery={gallery}
              setGallery={setGallery}
            />
            <hr />
            <p className="mb-0 text-center">
              Copyrights &copy; {new Date().getFullYear()} - All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCar;
