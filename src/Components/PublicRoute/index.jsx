import React from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If token exists, go to protected route (PrivateRoute)
  if (token) {
    return <PrivateRoute element={element} />;
  }

  // If no token, render the public component
  return element;
};

export default PublicRoute;
