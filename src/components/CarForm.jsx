import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import { Progress } from "reactstrap";
import apiCall from "../config/apiCall";
import app from "../config/app";
import { setAlert } from "../config/helpers";

const CarForm = ({
  formik,
  coverImage,
  setCoverImage,
  gallery,
  setGallery,
}) => {
  const [coverImageUploadProgress, setCoverImageUploadProgress] =
    useState(null);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(null);

  const coverImageUploadHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await apiCall
      .post("/uploads/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) =>
          setCoverImageUploadProgress(
            Math.round((progress.loaded * 100) / progress.total)
          ),
      })
      .then((resp) => {
        setCoverImage(resp.data.name);
        setCoverImageUploadProgress(null);
      })
      .catch((err) => {
        setAlert("Invalid File.");
        setCoverImageUploadProgress(null);
      });
  };

  const galleryUploadHandler = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    await apiCall
      .post("/uploads/multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
          setGalleryUploadProgress(
            Math.round((progress.loaded * 100) / progress.total)
          );
        },
      })
      .then((resp) => {
        setGallery((prev) => [...prev, ...resp.data]);
        setGalleryUploadProgress(null);
      })
      .catch((err) => {
        setAlert("Invalid Files.");
        setGalleryUploadProgress(null);
      });
  };

  const removeFileHandler = async () => {
    await apiCall
      .post("/uploads/remove", { name: coverImage })
      .then((resp) => {
        if (resp) {
          setCoverImage(null);
        }
      })
      .catch((err) => setAlert(err.message));
  };

  const removeMultipleFileHandler = async (name) => {
    await apiCall
      .post("/uploads/remove", { name })
      .then((resp) => {
        if (resp) {
          setGallery((prev) => prev.filter((img) => img.name !== name));
        }
      })
      .catch((err) => setAlert(err.message));
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    ["link", "image", "video"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 p-2">
              <label>
                Brand <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e. Toyota"
                {...formik.getFieldProps("brand")}
              />
              {formik.errors.brand && (
                <p className="text-danger" style={{ fontSize: "13px" }}>
                  <i className="lnr lnr-warning"></i>
                  {formik.errors.brand}
                </p>
              )}
            </div>
            <div className="col-md-6 p-2">
              <label>
                Title <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e. Corolla"
                {...formik.getFieldProps("title")}
              />
              {formik.errors.title && (
                <p className="text-danger" style={{ fontSize: "13px" }}>
                  <i className="lnr lnr-warning"></i>
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div className="col-md-6 p-2">
              <label>Model:</label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e. LE, Hybrid LE"
                {...formik.getFieldProps("model")}
              />
              {formik.errors.model && (
                <p className="text-danger" style={{ fontSize: "13px" }}>
                  <i className="lnr lnr-warning"></i>
                  {formik.errors.model}
                </p>
              )}
            </div>
            <div className="col-md-6 p-2">
              <label>
                Year <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e. 2022"
                {...formik.getFieldProps("year")}
              />
              {formik.errors.year && (
                <p className="text-danger" style={{ fontSize: "13px" }}>
                  <i className="lnr lnr-warning"></i>
                  {formik.errors.year}
                </p>
              )}
            </div>
            <div className="col-md-6 p-2">
              <label>
                Price <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="i.e. 4577887"
                {...formik.getFieldProps("price")}
              />
              {formik.errors.price && (
                <p className="text-danger" style={{ fontSize: "13px" }}>
                  <i className="lnr lnr-warning"></i>
                  {formik.errors.price}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <label className="mb-3">Upload Cover Image:</label>
          {coverImage ? (
            <div style={{ position: "relative" }}>
              <img
                src={`${app.serverUrl}/assets/images/${coverImage}`}
                alt="Not found"
                width="100%"
              />
              <button
                type="button"
                onClick={removeFileHandler}
                style={{
                  height: "20px",
                  width: "20px",
                  textAlign: "center",
                  lineHeight: "2px",
                  fontSize: "15px",
                  padding: "0px",
                  margin: "0px",
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  border: "0px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "100%",
                }}
              >
                &times;
              </button>
            </div>
          ) : (
            <>
              <Dropzone multiple={false} onDrop={coverImageUploadHandler}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({
                      className: "border-secondary dropzone",
                      style: { padding: "40px 50px" },
                    })}
                  >
                    <input {...getInputProps()} />
                    <p className="text-center text-secondary mb-0">
                      Drop your files or click to select files.
                    </p>
                  </div>
                )}
              </Dropzone>
              {coverImageUploadProgress && (
                <Progress value={coverImageUploadProgress} animated />
              )}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="mb-3">
        <label>
          Short Description <span className="text-danger">*</span>:
        </label>
        <textarea
          className="form-control"
          rows="5"
          {...formik.getFieldProps("description")}
        ></textarea>
        {formik.errors.description && (
          <p className="text-danger" style={{ fontSize: "13px" }}>
            <i className="lnr lnr-warning"></i>
            {formik.errors.description}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label className="mb-3">
          Choose Images for Gallery <span className="text-danger">*</span>:
        </label>
        <Dropzone onDrop={galleryUploadHandler}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className: "border-secondary dropzone mb-3",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-center text-secondary mb-0">
                Drop your files or click to select files.
              </p>
            </div>
          )}
        </Dropzone>
        {galleryUploadProgress && (
          <Progress value={galleryUploadProgress} animated />
        )}
        <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
          {gallery &&
            gallery.map((img, index) => (
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  position: "relative",
                }}
                key={index}
              >
                <img
                  src={`${app.serverUrl}/assets/images/${img.name}`}
                  alt="Not Found"
                  width="100%"
                />
                <button
                  type="button"
                  onClick={removeMultipleFileHandler.bind(this, img.name)}
                  style={{
                    height: "20px",
                    width: "20px",
                    textAlign: "center",
                    lineHeight: "2px",
                    fontSize: "15px",
                    padding: "0px",
                    margin: "0px",
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    border: "0px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "100%",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="mb-2">
          Specifications <span className="text-danger">*</span>:
        </label>
        <ReactQuill
          theme="snow"
          modules={{ toolbar: toolbarOptions }}
          // {...formik.getFieldProps("specifications")}
          value={formik.values.specifications}
          onChange={(e) => formik.handleChange("specifications")(e)}
        />
        {formik.errors.specifications && (
          <p className="text-danger" style={{ fontSize: "13px" }}>
            <i className="lnr lnr-warning"></i>
            {formik.errors.specifications}
          </p>
        )}
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default CarForm;
