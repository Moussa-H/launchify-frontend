import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/logo-dashboard.svg";

const Sidebar = ({ links, activeLink, onLinkClick }) => {
  const [openSection, setOpenSection] = useState(null);

  const handleSectionClick = (label) => {
    if (label === "Finance") {
      // Toggle Finance section open/close
      setOpenSection(openSection === label ? null : label);
    } else {
      // Close Finance section if it's open
      setOpenSection(null);
    }
  };

  return (
    <nav className="flex-column px-3 py-5 sidebar">
      <div className="sidebar-logo mb-5">
        <img src={logo} alt="Logo" className="img-fluid" />
      </div>
      {links.map(({ to, label, icon, children }) => {
        const isOpen = openSection === label;
        const isFinanceSection = label === "Finance";

        // Determine if any of the child links are active
        const isChildActive =
          children && children.some((child) => child.to === activeLink);

        return (
          <div key={label} className="sidebar-item">
            <div
              className={`sidebar-link ${
                isFinanceSection && isChildActive
                  ? ""
                  : activeLink === to
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                if (children) {
                  handleSectionClick(label);
                } else {
                  // Handle click for other sections
                  onLinkClick(to);
                  // Close Finance section if it's open
                  if (openSection === "Finance") {
                    setOpenSection(null);
                  }
                }
              }}
            >
              {icon}
              <span className="ms-2">{label}</span>
              {children && (
                <span
                  className={`arrow ${isOpen ? "up" : "down"}`}
                  style={{
                    marginLeft: "auto", // Aligns the arrow to the right
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease", // Smooth rotation
                  }}
                >
                  ▼
                </span>
              )}
            </div>
            {isOpen && children && (
              <div className="submenu">
                {children.map(({ to: childTo, label: childLabel }) => (
                  <div
                    key={childTo}
                    onClick={() => {
                      onLinkClick(childTo);
                      // Keep Finance section open if clicking on its submenu
                      if (label === "Finance") {
                        setOpenSection(label);
                      } else {
                        // Close Finance section if it's open
                        if (openSection === "Finance") {
                          setOpenSection(null);
                        }
                      }
                    }}
                    className={`sidebar-link ${
                      activeLink === childTo ? "active" : ""
                    }`}
                  >
                    <span className="ms-4">{childLabel}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;
