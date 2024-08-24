import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./style.css"; // Import the CSS file
import logo from "../../assets/logo.svg";
const SignUp = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center signup-container"
    >
      <div className="signup-box">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="signup-logo" />
        </div>

        <h3 class="text-center mb-5 custom-font-size">Create an account</h3>


        <Form>
          <Form.Group controlId="formUsername" className="mb-4">
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          {/* Radio Buttons */}
          <Form.Group
            controlId="formUserType"
            className="mb-4 text-center radio-btn"
          >
            <Form.Check
              inline
              label="Startup"
              name="userType"
              type="radio"
              id="radioStartup"
            />
            <Form.Check
              inline
              label="Investor"
              name="userType"
              type="radio"
              id="radioInvestor"
            />
            <Form.Check
              inline
              label="Mentor"
              name="userType"
              type="radio"
              id="radioMentor"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="signup-button w-100"
          >
            Sign up
          </Button>
        </Form>

        {/* Login Link */}
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <a href="/login" className="login-link">
            Login
          </a>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
