import React from "react";
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import "./style.css"
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ sidebar, children }) => {
  const username = localStorage.getItem("username");
const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.clear();
  navigate("/login")
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar w-64 p-0 bg-light">
          {sidebar}
        </Col>
        <Col xs={10} className="main-content p-0">
          <Navbar bg="light" expand="lg" className="mb-3">
            <Container fluid>
              <Nav className="ms-auto">
                <Navbar.Text className="me-3 name">
                  <div className="username-circle">{username.charAt(0)}</div>
                  {username}
                </Navbar.Text>
                <Dropdown align="end">
                      <i
                        className="bi bi-box-arrow-right"
                        onClick={handleLogout}
                      ></i>{" "}
  
                </Dropdown>
              </Nav>
            </Container>
          </Navbar>
          <Container fluid className="px-4">
            {children} {/* Render the passed children here */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
