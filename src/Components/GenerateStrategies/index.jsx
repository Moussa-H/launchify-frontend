import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import image from "../../assets/Strategy.png";
import "./style.css";
const GenerateStrategies = ({ token }) => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleNavigate = () => {
    
    navigate("strategies-table", { state: { token} }); // Navigate and pass the token
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-center strategies-container">
      <Row>
        <Col>
          <img
            src={image}
            alt="Strategy"
            className="img-fluid mb-4 strategy-image"
          />
          <h2 className="mb-4 strategy-title">
            AI-Powered Strategic Growth for Your Startup
          </h2>
          <p className="mb-4 strategy-description">
            Leverage AI-driven insights tailored to your startup's unique
            industry and goals. Our platform generates personalized strategies
            to guide your growth, helping you stay ahead in the market. Track,
            manage, and execute your strategic plans effortlessly, ensuring your
            business thrives with the power of AI.
          </p>
          <Button className="btn-dark strategy-button" onClick={handleNavigate}>
            Unlock Your Strategy
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GenerateStrategies;
