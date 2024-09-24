import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const PrivateRoute = ({ element, allowedRoles }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get(
          "/getRole",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { username },
          }
        );

        const userRole = response.data.role;
        if (userRole) {
          setRole(userRole);
        } else {
          console.error("Role is undefined in the response");
        }
      } catch (error) {
        console.error("Error fetching role", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

 if (loading) {
   return (
     <Box
       sx={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         height: "100vh", // Full-screen height
       }}
     >
       <CircularProgress /> {/* Material-UI loading spinner */}
     </Box>
   );
 }


if (!role) {
  // Clear local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  // Redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
}


  if (!allowedRoles || !allowedRoles.includes(role)) {
    const dashboardPath = `/${role.toLowerCase()}-dashboard`;
    console.log("Redirecting to:", dashboardPath);
    return <Navigate to={dashboardPath} replace />;
  }

  return element;
};

export default PrivateRoute;
