import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/logo-dashboard.svg";

const InvestorSidebar = ({ links, activeLink, onLinkClick }) => {
  const [openSection, setOpenSection] = useState(null);

  const handleSectionClick = (label) => {
    if (label === "Finance") {
      setOpenSection(openSection === label ? null : label);
    } else {
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
        const isChildActive =
          children &&
          children.some(
            (child) => `/investor-dashboard/${child.to}` === activeLink
          );

        return (
          <div key={label} className="sidebar-item">
            <div
              className={`sidebar-link ${
                isFinanceSection && isChildActive
                  ? ""
                  : activeLink.includes(to)
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                if (children) {
                  handleSectionClick(label);
                } else {
                  onLinkClick(to);
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
                    marginLeft: "auto",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    fontSize: "12px",
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
                      if (label === "Finance") {
                        setOpenSection(label);
                      }
                    }}
                    className={`sidebar-link ${
                      activeLink.includes(childTo) ? "active" : ""
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

export default InvestorSidebar;
