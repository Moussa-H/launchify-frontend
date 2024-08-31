import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = ({ links }) => (
  <Nav className="flex-column">
    {links.map(({ to, label }) => (
      <Nav.Item key={to}>
        <Nav.Link as={Link} to={to}>
          {label}
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);

export default Sidebar;
