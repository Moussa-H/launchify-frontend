import React from "react";

import PrivateRoute from "../PrivateRoute";

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
