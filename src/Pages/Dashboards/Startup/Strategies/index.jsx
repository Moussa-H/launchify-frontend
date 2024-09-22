import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StrategiesTable from "../../../../Components/StrategiesTable";
import image from "../../../../assets/Strategy.png"; // Ensure correct path for the image
import "./style.css";

const Strategies = ({ token }) => {
  const [apiStatus, setApiStatus] = useState(null); // For holding API call status
  const [strategies, setStrategies] = useState([]); // For holding strategy data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchStrategies = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(
          "http://localhost:8000/api/strategies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200 && response.data.status === "success") {
          setApiStatus("success");
          setStrategies(response.data.strategy || []); // Store the strategy data, defaulting to an empty array
        } else {
          setApiStatus("error");
        }
      } catch (error) {
        console.error("Error fetching strategies:", error);
        setApiStatus("error"); // Handle error status
      } finally {
        setIsLoading(false); // Stop loading after data is fetched
      }
    };

    fetchStrategies();
  }, [token]);

  const handleNavigate = () => {
    navigate("strategies-table"); // Navigate and pass the token
  };

  return (
    <Container>
      {isLoading ? (
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row> // Show spinner while loading
      ) : apiStatus === "success" ? (
        <StrategiesTable token={token} strategies={strategies} />
      ) : (
        <Row className="text-center">
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
              manage, and execute your strategic plans effortlessly, ensuring
              your business thrives with the power of AI.
            </p>
            <Button variant="dark" onClick={handleNavigate}>
              Unlock Your Strategy
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Strategies;
