import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0 40px 0",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/loading.gif`}
        alt="loading"
        width="200"
        height="200"
        style={{ borderRadius: "50%" }}
      />
      <p
        style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          color: "#9aa1ad",
          fontSize: "17px",
          marginTop: "8px",
        }}
      >
        Finding what's next…
      </p>
    </div>
  );
}

export default Loading;
