import React from "react";
import DashboardLayout from "../DashboardLayout";
import Sidebar from "../../../Components/Sidebar";
import { House, Notebook, DollarSign, Wallet, Users } from "lucide-react";
import Profile from "../Startup/Profile";
import Strategies from "../Startup/Strategies";
import DataEntry from "../Startup/DataEntry";
import FinanceDashboard from "../Startup/FinanceDashboard";
import MentorDirectory from "../Startup/MentorDirectory"; // Import Mentor Directory page
import { Routes, Route, useNavigate } from "react-router-dom";
import ChatMessages from "../Startup/ChatMessages";
import StrategiesTable from "../../../Components/StrategiesTable";

const StartupDashboard = () => {
  const token = localStorage.getItem("token");
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
    { to: "mentor-directory", label: "Mentors", icon: <Users /> },
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
        <Route path="strategies" element={<Strategies token={token} />} />
        <Route
          path="strategies/strategies-table"
          element={<StrategiesTable token={token} />}
        />
        <Route path="data-entry" element={<DataEntry />} />
        <Route path="finance-dashboard" element={<FinanceDashboard />} />
        <Route path="mentor-directory" element={<MentorDirectory />} />{" "}
        {/* Mentor Directory Route */}
        {/* Mentor Match Route */}
        <Route
          path="mentor-directory/chats/:mentorId/:startupId/:senderType"
          element={<ChatMessages />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default StartupDashboard;
