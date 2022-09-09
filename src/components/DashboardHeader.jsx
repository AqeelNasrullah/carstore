import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import apiCall from "../config/apiCall";
import { setAlert } from "../config/helpers";
import { useAuth } from "../contexts/auth-context";

const DashboardHeader = () => {
  const { user } = useAuth();
  const { changeAuthState } = useAuth();

  const logoutHandler = async () => {
    await apiCall("/auth/logout")
      .then((resp) => {
        changeAuthState(false);
      })
      .catch((err) => setAlert(err.message || "Something went wrong."));
  };

  return (
    <div
      className="py-2 px-4 d-flex justify-content-between align-items-center"
      style={{ borderBottom: "1px solid black" }}
    >
      <h3 className="text-brand mb-0">Car Store</h3>
      <div className="d-flex align-items-center gap-5">
        {/* <Link to="/dashboard" className="text-secondary">
          <i className="fa-solid fa-gauge"></i> Dashboard
        </Link> */}
        <Link to="/cars" className="text-secondary">
          <span className="fa fa-car-side"></span> Cars
        </Link>
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="nav-link text-secondary">
            <i className="fa-solid fa-user"></i> {user?.name}{" "}
            <span
              className="lnr lnr-chevron-down"
              style={{ fontSize: "12px" }}
            ></span>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              onClick={logoutHandler}
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <span className="lnr lnr-power-switch"></span> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

export default DashboardHeader;
