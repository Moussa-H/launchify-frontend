import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const InvestorSidebar = () => (
  <Nav className="flex-column">
    <Link to="profile">
      <Nav.Link>Profile</Nav.Link>
    </Link>
    <Link to="startups">
      <Nav.Link>Startups</Nav.Link>
    </Link>
  </Nav>
);

export default InvestorSidebar;
