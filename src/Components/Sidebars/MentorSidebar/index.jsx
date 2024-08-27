import React from "react";
import { Link } from "react-router-dom";

const MentorSidebar = () => (
  <div>
    <Link to="profile">Profile</Link>
    <Link to="requests">Requests</Link>
    <Link to="chatmessages">Chat Messages</Link>
  </div>
);

export default MentorSidebar;
