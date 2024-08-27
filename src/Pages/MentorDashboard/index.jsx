import React from "react";
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MentorSidebar from "../../Components/Sidebars/MentorSidebar";

const MentorDashboard = ({ title = "Startup Dashboard", username }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar p-0">
          <MentorSidebar />
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
            <Outlet /> {/* This is where the child routes will be rendered */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default MentorDashboard;
