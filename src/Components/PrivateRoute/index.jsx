import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ element, allowedRoles }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getRole", {
          headers: { Authorization: `Bearer ${token}` },
          params: { username: username },
        });

        console.log("API Response:", response.data); // Debugging: Log the API response

        // Check the structure of the response to ensure 'role' is correctly accessed
        const userRole = response.data.role;
        if (userRole) {
          setRole(userRole);
        } else {
          console.error("Role is undefined in the response");
          setRole(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching role", error);
        setRole(null);
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can add a loader or spinner here
  }

  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

 if (!allowedRoles.includes(role)) {
   const dashboardPath = `/${role.toLowerCase()}-dashboard`;
   console.log("Redirecting to:", dashboardPath);
   return <Navigate to={dashboardPath} replace />;
 }

  return element;
};

export default PrivateRoute;
