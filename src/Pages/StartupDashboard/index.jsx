import React, { useState } from "react";
import DashboardLayout from "../Dashboards/DashboardLayout";
import Sidebar from "../../Components/Sidebars/Sidebar";
import { House, Notebook } from "lucide-react";
import Profile from "../Dashboards/Startup/Profile";
import Strategies from "../Dashboards/Startup/Strategies";

const StartupDashboard = () => {
  const [activeLink, setActiveLink] = useState("profile");

  const links = [
    { to: "profile", label: "Profile", icon: <House /> }, // Icon for Profile
    { to: "strategies", label: "Strategies", icon: <Notebook /> }, // Icon for Strategies
  ];

  const renderContent = () => {
    switch (activeLink) {
      case "profile":
        return <Profile />;
      case "strategies":
        return <Strategies />;
      default:
        return <Profile />; // Default to Profile
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          links={links}
          activeLink={activeLink}
          onLinkClick={setActiveLink}
        />
      }
    >
      {renderContent()} {/* Render the content based on active link */}
    </DashboardLayout>
  );
};

export default StartupDashboard;
