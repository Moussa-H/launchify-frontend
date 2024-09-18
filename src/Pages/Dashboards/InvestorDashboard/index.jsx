import React from "react";
import DashboardLayout from "../DashboardLayout";
import Sidebar from "../../../Components/Sidebar";
import { House, PieChart, Users } from "lucide-react";
import Profile from "../Investor/Profile";
import Startups from "../Investor/Startups";
import Dashboard from "../Investor/Dashboard";
import StartupDetails from "../Investor/StartupDetails";
import InvestmentForm from "../Investor/InvestmentForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51Pyj3MFplAWf40dFM0pwmsAkyZqk4mCqHw6Z5Jqp6M2cLBpT3o8aVFqQ4dGE7xaSzIsSl9dOJwcDKfO7sNGYjkwm003EeJvZIE");

const InvestorDashboard = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  const navigate = useNavigate(); // Hook for navigating programmatically

  // Define links for the investor dashboard
  const links = [
    { to: "profile", label: "Profile", icon: <House /> },
    { to: "dashboard", label: "Dashboard", icon: <PieChart /> },
    { to: "startups", label: "Startups", icon: <Users /> },
  ];

  const handleLinkClick = (to) => {
    navigate(`/investor-dashboard/${to}`); // Update URL
  };

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          links={links}
          activeLink={window.location.pathname.split("/").pop()}
          onLinkClick={handleLinkClick}
        />
      }
    >
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="startups" element={<Startups />} />
          <Route
            path="startups/details/:startupId"
            element={<StartupDetails />}
          />
          <Route
            path="startups/investment/:startupId"
            element={<InvestmentForm />}
          />
        </Routes>
      </Elements>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
