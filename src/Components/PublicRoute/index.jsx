import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element}) => {
  const token = localStorage.getItem("token");

  if (token) {
    const role = localStorage.getItem("role");
    const redirectPath = `/${role}-dashboard`;
    return <Navigate to={redirectPath} replace />;
  }

  return element; // Render the public component if no redirection is needed
};

export default PublicRoute;
