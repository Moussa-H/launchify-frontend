import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashboardNavbar from "../../../Components/DashboardNavbar"; // Import the new component
import "./style.css";

const DashboardLayout = ({ sidebar, children }) => {
  const username = localStorage.getItem("username");

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar w-64 p-0 bg-light">
          {sidebar}
        </Col>
        <Col xs={10} className="main-content p-0">
      
          <DashboardNavbar username={username} />
          <Container fluid className="px-4">
            {children} 
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
