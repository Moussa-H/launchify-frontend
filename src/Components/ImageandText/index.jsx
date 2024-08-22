import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css"; // Import the corresponding CSS file

const ImageandText = ({ title, description, image, imageFirst = false }) => {
  return (
    <Container className="info-section">
      <Row
        className={`align-items-center ${imageFirst ? "flex-row-reverse" : ""}`}
      >
        <Col md={6}>
          <div className="text-content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <img src={image} alt={title} className="section-image" />
        </Col>
      </Row>
    </Container>
  );
};


export default ImageandText;
