import React from "react";
import { Nav } from "react-bootstrap";
import "./style.css";

const Sidebar = ({ links, activeLink, onLinkClick }) => (
  <Nav className="flex-column p-3 sidebar">
    <div className="sidebar-logo mb-4">
      <img src="/logo-white.svg" alt="Logo" className="img-fluid" />{" "}
    
    </div>
    {links.map(({ to, label, icon }) => {
      const isActive = activeLink === to;
      return (
        <Nav.Item key={to}>
          <Nav.Link
            onClick={() => onLinkClick(to)}
            className={`sidebar-link ${isActive ? "active" : ""}`}
          >
            {icon} {/* Display the corresponding icon */}
            <span className="ms-2">{label}</span>{" "}
            {/* Label with margin for spacing */}
          </Nav.Link>
        </Nav.Item>
      );
    })}
  </Nav>
);

export default Sidebar;
