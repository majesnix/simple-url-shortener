import React from "react";
import { Route, Routes } from "react-router";
import Admin from "./views/Admin";
import Login from "./views/Login";
import Terms from "./views/Terms";
import Error from "./views/Error";
import Index from "./views/Index";

export default () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/login" element={<Login />} />
    <Route path="/terms" element={<Terms />} />
    <Route element={<Error />} />
  </Routes>
);
