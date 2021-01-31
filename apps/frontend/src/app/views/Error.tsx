import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ApiClient from "../dataLayer/api/ApiClient";

const Error = () => {
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lookupShortUrl = async () => {
      const data = await ApiClient.resolveId(
        location.pathname.replace("/", "")
      );
      if (!data.includes("http") || !data.includes("https")) {
        window.location.href = "https://" + data;
      } else {
        window.location.href = data;
      }
    };
    lookupShortUrl().catch((err) => {
      console.error("Error on URL lookup", err);
      setErr(true);
    });
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
