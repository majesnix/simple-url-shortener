import React from "react";
import { Link } from "react-router-dom";

const Links = () => (
  <>
    <Link
      to="/"
      style={{
        position: "absolute",
        right: "6.5rem",
        bottom: "0",
        margin: "0 1.5rem 1.5rem 0",
        color: "#FBFBFB",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Home
    </Link>
    <Link
      to="/terms"
      style={{
        position: "absolute",
        right: "0",
        bottom: "0",
        margin: "0 1.5rem 1.5rem 0",
        color: "#FBFBFB",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Terms
    </Link>
  </>
);

export default Links;
