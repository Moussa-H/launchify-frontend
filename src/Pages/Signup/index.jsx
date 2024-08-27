import React, { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import logo from "../../assets/logo.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const userTypes = ["Startup", "Investor", "Mentor"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      navigate("/login");
      console.log("Registration successful:", response.data);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setValidationError("Validation Error");
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
      className="d-flex justify-content-center align-items-center signup-container"
    >
      <div className="signup-box">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="signup-logo" />
        </div>

        <h3 className="text-center mb-5 custom-font-size">Create an account</h3>

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

          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
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

          {/* Dynamic Radio Buttons */}
          <Form.Group
            controlId="formUserType"
            className="mb-4 text-center radio-btn"
          >
            {userTypes.map((type) => (
              <Form.Check
                inline
                label={type}
                name="role"
                type="radio"
                id={`radio${type}`}
                key={type}
                value={type}
                checked={formData.role === type}
                onChange={handleChange}
                required
              />
            ))}
          </Form.Group>

          {validationError && (
            <Alert variant="danger" className="text-center">
              {validationError}
            </Alert>
          )}

          <Button
            variant="primary"
            type="submit"
            className="signup-button w-100"
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
              "Sign up"
            )}
          </Button>
        </Form>

        {/* Login Link */}
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link href="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
