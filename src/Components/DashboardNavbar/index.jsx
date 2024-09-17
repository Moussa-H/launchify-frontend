import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

const DashboardNavbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Nav className="ms-auto">
          <Navbar.Text className="me-3 name">
            <div className="username-circle">{username.charAt(0)}</div>
            {username}
          </Navbar.Text>
          <Dropdown align="end">
            <i className="bi bi-box-arrow-right" onClick={handleLogout}></i>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
