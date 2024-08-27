import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ element, restricted, ...rest }) => {
  const token = localStorage.getItem("token");

  if (token && restricted) {
    // Redirect to the appropriate dashboard if the user is already logged in
    const role = localStorage.getItem("role");
    const redirectPath = `/${role}-dashboard`;
    return <Navigate to={redirectPath} />;
  }

  return <Route {...rest} element={element} />;
};

export default PublicRoute;
