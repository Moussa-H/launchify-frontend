import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ sidebar }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar">
          {sidebar}
        </Col>
        <Col xs={10} className="main-content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
