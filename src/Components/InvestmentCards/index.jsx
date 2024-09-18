import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const InvestmentCards = () => {
  const [data, setData] = useState({
    total_investment: 0,
    number_of_startups_invested: 0,
    total_startups: 0,
  });
  const token = localStorage.getItem("token");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/summary", {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
            "Content-Type": "application/json",
          },
        });
        setData(response.data); // Assuming the API response has the correct structure
      } catch (err) {
        setError("Failed to fetch investment data");
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Row className="justify-content-cente-invest">
      <Col md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "14px",
                color: "#848484",
                fontWeight: 400,
              }}
            >
              Total Investment
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "22px",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              {"$"}
              {data.total_investment}
            </Typography>
          </CardContent>
        </Card>
      </Col>
      <Col md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "14px",
                color: "#848484",
                fontWeight: 400,
              }}
            >
              Number of Startups Invested
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "22px",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              {data.number_of_startups_invested}
            </Typography>
          </CardContent>
        </Card>
      </Col>
      <Col md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "14px",
                color: "#848484",
                fontWeight: 400,
              }}
            >
              Total Startups
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "22px",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              {data.total_startups}
            </Typography>
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

export default InvestmentCards;
