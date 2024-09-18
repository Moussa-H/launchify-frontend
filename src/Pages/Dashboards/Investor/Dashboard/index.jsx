import React from "react";
import InvestmentCards from "../../../../Components/InvestmentCards";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import LastStartupsCarousel from "../../../../Components/LastStartupsCarousel";
import TableInvestment from "../../../../Components/TableInvestment";

const token = localStorage.getItem("token");


const FinanceDashboard = () => {
  return (
    <div>
      <Container className="dashboard-container">
        <InvestmentCards token={token} />

        <LastStartupsCarousel token={token} />

        <TableInvestment token={token} />
      </Container>
    </div>
  );
};

export default FinanceDashboard;
