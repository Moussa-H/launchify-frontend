import React from "react";
import DashboardLayout from "../Dashboards/DashboardLayout";
import Sidebar from "../../Components/Sidebars/Sidebar";
import { Routes, Route } from "react-router-dom";
import Profile from "../Dashboards/Startup/Profile";
import Strategies from "../Dashboards/Startup/Strategies";

const links = [
  { to: "profile", label: "Profile" },
  { to: "strategies", label: "Strategies" },
];

const StartupDashboard = () => (
  <DashboardLayout sidebar={<Sidebar links={links} />}>
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="strategies" element={<Strategies />} />
    </Routes>
  </DashboardLayout>
);

export default StartupDashboard;
