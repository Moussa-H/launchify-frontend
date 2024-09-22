import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Alert, Snackbar } from "@mui/material"; // Import Material-UI components for feedback

const InvestmentForm = () => {
  const [amount, setAmount] = useState(""); // Investment amount
  const [investorId, setInvestorId] = useState(""); // You can pre-fill this if necessary
  const [startupInfo, setStartupInfo] = useState(null); // Holds startup information
  const [processing, setProcessing] = useState(false); // Payment processing state
  const [error, setError] = useState(""); // Holds error messages
  const [investmentError, setInvestmentError] = useState(""); // Holds specific investment error
  const [openSnackbar, setOpenSnackbar] = useState(false); // For displaying feedback
  const stripe = useStripe();
  const elements = useElements();
  const { startupId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("startupId", startupId);

  useEffect(() => {
    const fetchStartupInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getInformationPayment`,
          {
            params: { startup_id: startupId },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setStartupInfo(response.data);
        setError(""); // Clear previous errors
      } catch (err) {
        console.error("Error fetching startup info:", err);
        setError(
          "Failed to fetch startup information. Please try again later."
        );
      }
    };

    if (startupId) fetchStartupInfo();
  }, [startupId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (parseInt(amount, 10) > startupInfo.needed_investment) {
      setInvestmentError(
        `The amount exceeds the required investment. You can only invest up to $${startupInfo.needed_investment}.`
      );
      setOpenSnackbar(true); // Show the error message as a Snackbar
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setProcessing(true); // Start processing the payment

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      console.error(stripeError);
      setProcessing(false);
      return;
    }

    try {
      console.log(startupId, amount, paymentMethod.id);
     const response = await axios.post(
       "http://localhost:8000/api/investments",
       {
         startup_id: startupId,
         amount: parseInt(amount, 10),
         payment_method_id: paymentMethod.id,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`, // Make sure the token is included
           "Content-Type": "application/json",
         },
       }
     );

      const result = response.data;
      setProcessing(false); // Stop processing

      if (result.requires_action) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          result.client_secret
        );

        if (confirmError) {
          console.error(confirmError);
          setInvestmentError(`Investment failed: ${confirmError.message}`);
          setOpenSnackbar(true);
        } else {
          setInvestmentError("Investment successful!");
          setOpenSnackbar(true);
        }
      } else {
        setInvestmentError("Investment successful!");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error(err);
      setInvestmentError(
        `Investment failed: ${err.response?.data?.error || err.message}`
      );
      setOpenSnackbar(true);
      setProcessing(false); // Stop processing
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar after timeout or user interaction
  };

  return (
    <>
      <div className="payment-container">
        <div className="card">
          <ArrowBackIcon
            style={{ cursor: "pointer", marginBottom: "16px" }}
            onClick={() => navigate("/investor-dashboard/startups")} // Navigate back to /startups
          />
          <div className="container-fluid-payment">
            <div>
              <h2 className="section-title">Startup Information</h2>
            </div>
            {/* Display loading or error message */}
            {!startupInfo && !error && (
              <div>Loading startup information...</div>
            )}
            {error && <div className="error-message">{error}</div>}

            {/* Display startup information once loaded */}
            {startupInfo && (
              <>
                <div className="info-field">
                  <strong>Company Name: </strong> {startupInfo.company_name}
                </div>

                <div className="info-field">
                  <strong>Founder: </strong> {startupInfo.founder}
                </div>

                <div className="info-field">
                  <strong>Total Needed Investment: </strong> $
                  {startupInfo.needed_investment}
                </div>
              </>
            )}

            {/* Investment amount input */}
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                id="amount"
                className="form-input"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setAmount(value); // Only allow non-negative values
                  }
                }}
                placeholder="Enter amount"
                required
              />
            </div>

            <hr className="divider" />

            <h2 className="section-title">Card Information</h2>

            <div className="card-element-container">
              <label htmlFor="cardElement" className="form-label">
                Card Number
              </label>
              <CardElement id="cardElement" className="card-element" />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={processing || !startupInfo}
              onClick={handleSubmit}
            >
              {processing ? "Processing..." : "Invest Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar for displaying feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            investmentError.includes("successful") ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {investmentError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InvestmentForm;
