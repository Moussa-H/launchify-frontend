import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { LogOut } from "lucide-react";

const DashboardNavbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Nav className="ms-auto flex">
          <Navbar.Text className="me-3 name">
            <div className="username-circle">{username.charAt(0)}</div>
            {username}
          </Navbar.Text>

          <Dropdown align="end">
            <LogOut onClick={handleLogout} />
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
