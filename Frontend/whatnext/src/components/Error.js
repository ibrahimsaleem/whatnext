import React from "react";
import { Alert } from "@material-ui/lab";

function Error(props) {
  return (
    <center>
      <Alert
        style={{
          maxWidth: "480px",
          margin: "20px 16px 40px 16px",
          backgroundColor: "#2a1c1e",
          color: "#f3efe6",
          border: "1px solid #c8434f55",
          borderRadius: "10px",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}
        severity="error"
        iconMapping={{ error: <span style={{ color: "#c8434f" }}>⚠</span> }}
      >
        {props.error}
      </Alert>
    </center>
  );
}

export default Error;
