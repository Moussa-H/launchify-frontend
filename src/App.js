import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your pages
import Home from "./Pages/Home";
import Startups from "./Pages/Startups";
// import Investors from "./Pages/Investors";
import Mentors from "./Pages/Mentors";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import StartupDashboard from "./Pages/Dashboards/StartupDashboard";
// Import your route components
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";
import MentorDashboard from "./Pages/Dashboards/MentorDashboard";
import InvestorDashboard from "./Pages/Dashboards/InvestorDashboard";
import InvestmentForm from "./Pages/Dashboards/Investor/InvestmentForm";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Investors from "./Pages/Investors";
window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "a6d62ad7353778a90be9", // Replace with your Pusher key
  cluster: "eu", // Replace with your Pusher cluster
  encrypted: true,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Home />} />} />
        <Route
          path="/startups"
          element={<PublicRoute element={<Startups />} />}
        />
        <Route
          path="/investors"
          element={<PublicRoute element={<Investors />} />}
        />
        <Route
          path="/mentors"
          element={<PublicRoute element={<Mentors />} />}
        />
        <Route
          path="/about-us"
          element={<PublicRoute element={<AboutUs />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} restricted={true} />}
        />
        <Route
          path="/sign-up"
          element={<PublicRoute element={<SignUp />} restricted={true} />}
        />
        <Route
          path="/startup-dashboard/*"
          element={
            <PrivateRoute
              allowedRoles={["Startup"]}
              element={<StartupDashboard />}
            />
          }
        />
        <Route
          path="/mentor-dashboard/*"
          element={
            <PrivateRoute
              allowedRoles={["Mentor"]}
              element={<MentorDashboard />}
            />
          }
        />
        <Route
          path="/investor-dashboard/*"
          element={
            <PrivateRoute
              allowedRoles={["Investor"]}
              element={<InvestorDashboard />}
            />
          }
        />
        {/* <Route
          path="/investor-dashboard/*"
          element={
            <PrivateRoute
              allowedRoles={["investor"]}
              element={<InvestorDashboard />}
            />
          }
        />  */}
      </Routes>
    </Router>
  );
}

export default App;
