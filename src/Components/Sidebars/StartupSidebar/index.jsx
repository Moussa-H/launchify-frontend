import React from "react";
import { Link } from "react-router-dom";

const StartupSidebar = () => (
  <div className="sidebar">
    <ul className="list-unstyled">
      <li>
        <Link to="profile">Profile</Link>
      </li>
      <li>
        <Link to="strategies">Strategies</Link>
      </li>
      <li>
        <Link to="finance">Finance</Link>
      </li>
      <li>
        <Link to="investment">Investment</Link>
      </li>
      <li>
        <Link to="mentors">Mentors</Link>
      </li>
    </ul>
  </div>
);

export default StartupSidebar;
