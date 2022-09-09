import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div>
      <h6 style={{ textAlign: "center" }}>
        <Spinner color="dark" />
      </h6>
    </div>
  );
};

export default Loading;
