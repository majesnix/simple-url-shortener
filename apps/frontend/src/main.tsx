import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import Auth from "./app/dataLayer/auth/Auth";

Auth.init().then(() => console.log("INITED"));

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
