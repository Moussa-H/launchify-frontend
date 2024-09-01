import React, { useState } from "react";
import DashboardLayout from "../Dashboards/DashboardLayout";
import Sidebar from "../../Components/Sidebar";
import { House, Notebook, DollarSign } from "lucide-react";
import Profile from "../Dashboards/Startup/Profile";
import Strategies from "../Dashboards/Startup/Strategies";
import DataEntry from "../Dashboards/Startup/DataEntry";
import FinanceDashboard from "../Dashboards/Startup/FinanceDashboard";

const StartupDashboard = () => {
  const [activeLink, setActiveLink] = useState("profile");

 const links = [
   { to: "profile", label: "Profile", icon: <House /> },
   { to: "strategies", label: "Strategies", icon: <Notebook /> },
   {
     label: "Finance", // No 'to' property, so it's not clickable
     icon: <DollarSign />,
     children: [
       { to: "data-entry", label: "Data Entry" },
       { to: "finance-dashboard", label: "Dashboard" },
     ],
   },
 ];


  const renderContent = () => {
    switch (activeLink) {
      case "profile":
        return <Profile />;
      case "strategies":
        return <Strategies />;
      case "data-entry":
        return <DataEntry />;
      case "finance-dashboard":
        return <FinanceDashboard />;
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
