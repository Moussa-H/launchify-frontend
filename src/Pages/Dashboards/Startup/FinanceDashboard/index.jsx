import React from "react";
import FinancialCards from "../../../../Components/FinancialCards"; // Adjust the path if necessary
import MonthlyBreakdownChart from "../../../../Components/MonthlyBreakdownChart";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import ExpensesTable from "../../../../Components/ExpensesTable";
import GraphIncomes from "../../../../Components/GraphIncomes";
const token = localStorage.getItem("token");

const FinanceDashboard = () => {
  return (
    <div>
      <Container className="dashboard-container">
        <FinancialCards token={token} />
        <div className="chart-container">
          <MonthlyBreakdownChart token={token} />
        </div>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="chart-container">
              <ExpensesTable token={token} />
            </div>
          </Col>
          <Col md={6}>
            <div className="pie-container">
              <GraphIncomes token={token} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinanceDashboard;
