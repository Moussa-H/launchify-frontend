import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./style.css"; // Import the CSS file
import logo from "../../assets/logo.svg";
const Login = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center Login-container"
    >
      <div className="Login-box">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="Login-logo" />
        </div>

        <h3 class="text-center mb-5 custom-font-size">Login to your account</h3>

        <Form>
          <Form.Group controlId="formUsername" className="mb-4">
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="Login-button w-100"
          >
            Login
          </Button>
        </Form>

        {/* Login Link */}
        <div className="text-center mt-3">
          <span>Don’t have an account ? </span>
          <a href="/sign-up" className="login-link">
            Sign up
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Login;
