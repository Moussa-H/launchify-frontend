import React from "react";
import DashboardLayout from "../DashboardLayout";
import Sidebar from "../../../Components/Sidebar";
import { House, MessageCircle, Users } from "lucide-react"; // Ensure you have these icons
import Profile from "../Mentor/Profile";
import Messages from "../Mentor/Messages";
import { Routes, Route, useNavigate } from "react-router-dom";
import AcceptedStartups from "../Mentor/AcceptedStartups";
import ChatMessagesMentor from "../Mentor/ChatMessagesMentor";
const token=localStorage.getItem("token")

console.log(token);
const MentorDashboard = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  const links = [
    { to: "profile", label: "Profile", icon: <House /> },
    { to: "messages", label: "Request messages", icon: <MessageCircle /> },
    { to: "startups", label: "Startups", icon: <Users /> },
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
        <Route path="startups" element={<AcceptedStartups />} />
        <Route
          path="startups/:mentorId/:startupId/:senderType"
          element={<ChatMessagesMentor />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default MentorDashboard;
