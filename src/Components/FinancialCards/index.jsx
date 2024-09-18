import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const FinancialCards = ({ token }) => {
  const [data, setData] = useState({
    total_incomes_sum: 0,
    total_expenses_sum: 0,
    savings: 0,
  });

  const [error, setError] = useState(null);
  // Ensure token is retrieved properly

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/total-expenses-incomes",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data); // Assuming the API response has the correct structure
      } catch (err) {
        setError("Failed to fetch financial data");
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Row className="justify-content-center">
      <Col md={4} >
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
              Total Income
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
              {data.total_incomes_sum}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "12px",
              }}
            >
              From last year
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
              Total Expense
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
              {data.total_expenses_sum}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "12px",
              }}
            >
              From last year
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
              Total Savings
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
              {data.savings}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "12px",
              }}
            >
              From last year
            </Typography>
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

export default FinancialCards;
