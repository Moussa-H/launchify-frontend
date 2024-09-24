import React, { useState, useEffect } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axiosInstance from "../../axiosInstance";
import dayjs from "dayjs";
import "./style.css";

// Base API URL and headers
const token = localStorage.getItem("token");
const API_URL = "/incomes"; // Adjusted to your incomes endpoint
const headers = {
  Authorization: `Bearer ${token}`, // Ensure 'token' is defined or retrieved appropriately
  "Content-Type": "application/json",
};

const Incomes = () => {
  const [date, setDate] = useState(dayjs());
  const [formValues, setFormValues] = useState({
    product_sales: "",
    service_revenue: "",
    subscription_fees: "",
    investment_income: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, [date]);

  // Fetch incomes based on the selected date
  const fetchIncomes = async () => {
    try {
      const year = date.year();
      const month = date.month() + 1;

      // Fetch the incomes for the selected year and month
      const response = await axiosInstance.get(API_URL, {
        headers,
        params: { year, month },
      });

      const incomesData = response.data.data;

      if (incomesData && incomesData.length > 0) {
        const income = incomesData[0]; // Assuming only one record for the given month/year
        setFormValues({
          product_sales: income.product_sales || "",
          service_revenue: income.service_revenue || "",
          subscription_fees: income.subscription_fees || "",
          investment_income: income.investment_income || "",
        });
        setIsUpdating(true);
      } else {
        resetForm();
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormValues({
      product_sales: "",
      service_revenue: "",
      subscription_fees: "",
      investment_income: "",
    });
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle saving or updating incomes
  const handleSave = async () => {
    const payload = {
      ...formValues,
      year: date.year(),
      month: date.month() + 1, // zero-indexed in dayjs
    };

    try {
      if (isUpdating) {
        await axiosInstance.put(API_URL, payload, { headers }); // Update incomes
        setSuccessMessage("Incomes updated successfully!");
      } else {
        await axiosInstance.post(API_URL, payload, { headers }); // Save new incomes
        setSuccessMessage("Incomes saved successfully!");
      }

      // Open success message
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving incomes:", error);
    }
  };

  // Handle closing of Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="container border p-5 mt">
      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <div className="col-md-10 mb-4 mx-auto p-0">
        <div className="date-flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             
              views={["month", "year"]}
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="row display-center">
        {Object.keys(formValues).map((key) => (
          <div key={key} className="col-12 col-md-5 mb-4">
            <TextField
              label={key.replace("_", " ").toUpperCase()}
              type="number"
              variant="filled"
              fullWidth
              className="mt-4"
              required
              name={key}
              value={formValues[key]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className="col-md-10 mb-4 mx-auto p-0">
          <div className="mt-4 btn-save px-3">
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isUpdating ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
