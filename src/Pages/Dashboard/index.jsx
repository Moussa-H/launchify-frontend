import React from "react";
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import InvestorSidebar from "../../Components/Sidebars/InvestorSidebar";
import MentorSidebar from "../../Components/Sidebars/MentorSidebar";
import StartupSidebar from "../../Components/Sidebars/StartupSidebar";

const Dashboard = ({ title, username }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Function to determine the appropriate sidebar based on role
  const getSidebar = () => {
    switch (role) {
      case "investor":
        return <InvestorSidebar />;
      case "mentor":
        return <MentorSidebar />;
      case "startup":
        return <StartupSidebar />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar p-0">
          {getSidebar()}
        </Col>
        <Col xs={10} className="main-content p-0">
          <Navbar bg="light" expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand>{title}</Navbar.Brand>
              <Nav className="ms-auto">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    <i className="bi bi-person-circle"></i> {username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Container>
          </Navbar>
          <Container fluid>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
