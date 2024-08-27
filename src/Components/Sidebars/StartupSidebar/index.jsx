import React from "react";
import { Link } from "react-router-dom";

const StartupSidebar = () => (
  <div>
    <Link to="profile">Profile</Link>
    <Link to="strategies">Strategies</Link>
    <Link to="finance">Finance</Link>
    <Link to="investment">Investment</Link>
    <Link to="mentors">Mentors</Link>
  </div>
);

export default StartupSidebar;
