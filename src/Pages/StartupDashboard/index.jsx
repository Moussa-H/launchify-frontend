import React, { useState } from "react";
import DashboardLayout from "../Dashboards/DashboardLayout";
import Sidebar from "../../Components/Sidebar";
import { House, Notebook, DollarSign, Wallet } from "lucide-react";
import Profile from "../Dashboards/Startup/Profile";
import Strategies from "../Dashboards/Startup/Strategies";
import DataEntry from "../Dashboards/Startup/DataEntry";
import FinanceDashboard from "../Dashboards/Startup/FinanceDashboard";
import { Routes, Route, useNavigate } from "react-router-dom";

const StartupDashboard = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  const links = [
    { to: "profile", label: "Profile", icon: <House /> },
    { to: "strategies", label: "Strategies", icon: <Notebook /> },
    {
      label: "Finance", // No 'to' property, so it's not clickable
      icon: <Wallet />,
      children: [
        { to: "data-entry", label: "Data Entry" },
        { to: "finance-dashboard", label: "Dashboard" },
      ],
    },
  ];

  const handleLinkClick = (to) => {
    navigate(`/startup-dashboard/${to}`); // Update URL
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
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="strategies" element={<Strategies />} />
        <Route path="data-entry" element={<DataEntry />} />
        <Route path="finance-dashboard" element={<FinanceDashboard />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StartupDashboard;
