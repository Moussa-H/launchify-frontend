import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



// Import your pages
import Home from "./Pages/Home";
import Startups from "./Pages/Startups";
import Investors from "./Pages/Investors";
import Mentors from "./Pages/Mentors";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/startups" element={<PublicRoute><Startups /></PublicRoute>} />
        <Route path="/investors" element={<PublicRoute><Investors /></PublicRoute>} />
        <Route path="/mentors" element={<PublicRoute><Mentors /></PublicRoute>} />
        <Route path="/about-us" element={<PublicRoute><AboutUs /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />


        <Route
          path="*"
          element={
            <PrivateRoute allowedRoles={["startup", "mentor", "investor"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
