import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ApiClient from "../dataLayer/api/ApiClient";

const Error = () => {
  const base =
    process.env.REACT_APP_ENV !== "production"
      ? `http://${process.env.NX_BASE_URL}:${process.env.NX_PORT}`
      : `https://${process.env.NX_BASE_URL}`;
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lookupShortUrl = async () => {
      try {
        console.log("loc", location.pathname.replace("/", ""));
        const data = await ApiClient.resolveId(
          location.pathname.replace("/", "")
        );
        console.log("data", data);
        if (!data.includes("http") || !data.includes("https")) {
          window.location.href = "https://" + data;
        } else {
          window.location.href = data;
        }
      } catch (err) {
        console.error("ERROR IN ERROR", err);
        setErr(true);
      }
    };
    lookupShortUrl().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {err && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.8rem",
          }}
        >
          <img src="/assets/error.png" alt="error" />
          <h1>404</h1>
          <p>No Shortlink with this ID exists or something went wrong</p>
        </div>
      )}
    </div>
  );
};

export default Error;
