import React, { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import "./style.css"; // Import the CSS file
import logo from "../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      console.log("Login successful:", response.data);
      // Handle success (e.g., redirect to a different page)
      navigate("/dashboard"); // Redirect to the dashboard or any other page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setValidationError(error.response.data.message);
      } else {
        setValidationError(
          "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

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

        <h3 className="text-center mb-5 custom-font-size">
          Login to your account
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {validationError && (
            <Alert variant="danger" className="text-center">
              {validationError}
            </Alert>
          )}

          <Button
            variant="primary"
            type="submit"
            className="Login-button w-100"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <Link href="/sign-up" className="login-link">
            Sign up
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
