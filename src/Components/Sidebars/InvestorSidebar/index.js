import React from "react";
import { Link } from "react-router-dom";

const InvestorSidebar = () => (
  <div>
    <Link to="profile">Profile</Link>
    <Link to="startups">Startups</Link>
  </div>
);

export default InvestorSidebar;
