import React from "react";
import DashboardLayout from "../DashboardLayout";
import Sidebar from "../../../Components/Sidebar";
import { House, MessageCircle } from "lucide-react"; // Ensure you have these icons
import Profile from "../Mentor/Profile";
import Messages from "../Mentor/Messages";
import { Routes, Route, useNavigate } from "react-router-dom";
import MentorMessage from "../Mentor/MentorMessage";
const token=localStorage.getItem("token")
console.log(token);
const MentorDashboard = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  const links = [
    { to: "profile", label: "Profile", icon: <House /> },
    { to: "messages", label: "Messages", icon: <MessageCircle /> },
    { to: "message", label: "Message", icon: <MessageCircle /> },
  ];

  const handleLinkClick = (to) => {
    navigate(`/mentor-dashboard/${to}`); // Update URL
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
        <Route path="profile" element={<Profile token={token} />} />
        <Route path="messages" element={<Messages token={token} />} />
        <Route
          path="message"
          element={<MentorMessage />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default MentorDashboard;
