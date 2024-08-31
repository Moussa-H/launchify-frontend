import React from "react";
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";

const DashboardLayout = ({ sidebar, children }) => {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar p-0 bg-light">
          {" "}
          {/* Sidebar column */}
          {sidebar}
        </Col>
        <Col xs={10} className="main-content p-0">
          {" "}
          {/* Main content column */}
          <Navbar bg="light" expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand>Dashboard</Navbar.Brand>
              <Nav className="ms-auto">
                <Navbar.Text className="me-3">
                  <i className="bi bi-person-circle"></i> {username}{" "}
                  {/* Display username */}
                </Navbar.Text>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    <i className="bi bi-person-circle"></i>
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
            {children} {/* Render the passed children here */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
