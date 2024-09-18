import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import "./style.css";

// Base API URL and headers
const token = localStorage.getItem("token");
const API_URL = "http://localhost:8000/api/expenses";
const headers = {
  Authorization: `Bearer ${token}`, // Make sure 'token' is defined or retrieved appropriately
  "Content-Type": "application/json",
};

const Expenses = () => {
  const [date, setDate] = useState(dayjs());
  const [formValues, setFormValues] = useState({
    office_rent: "",
    maintenance: "",
    marketing: "",
    software_licenses: "",
    legal_accounting: "",
    office_supplies: "",
    miscellaneous: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [date]);

  // Fetch expenses based on selected date
 const fetchExpenses = async () => {
   try {
     const year = date.year();
     const month = date.month() + 1;
     console.log("year", year);
     console.log("month", month);

     // Fetch the expenses for the selected year and month
     const response = await axios.get(API_URL, {
       headers,
       params: { year, month },
     });

     const expensesData = response.data.data; // Ensure you're accessing `data.data`

     if (expensesData && expensesData.length > 0) {
       const expense = expensesData[0]; // Assuming only one record for the given month/year
       setFormValues({
         office_rent: expense.office_rent || "",
         maintenance: expense.maintenance || "",
         marketing: expense.marketing || "",
         software_licenses: expense.software_licenses || "",
         legal_accounting: expense.legal_accounting || "",
         office_supplies: expense.office_supplies || "",
         miscellaneous: expense.miscellaneous || "",
       });
       setIsUpdating(true);
     } else {
       resetForm();
       setIsUpdating(false);
     }
   } catch (error) {
     console.error("Error fetching expenses:", error);
   }
 };


  // Reset form fields
  const resetForm = () => {
    setFormValues({
      office_rent: "",
      maintenance: "",
      marketing: "",
      software_licenses: "",
      legal_accounting: "",
      office_supplies: "",
      miscellaneous: "",
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

  // Handle saving or updating expenses
  const handleSave = async () => {
    const payload = {
      ...formValues,
      year: date.year(),
      month: date.month() + 1, // zero-indexed in dayjs
    };

    try {
      if (isUpdating) {
        await axios.put(API_URL, payload, { headers }); // Update expenses
        console.log("Expenses updated successfully!");
      } else {
        await axios.post(API_URL, payload, { headers }); // Save new expenses
        console.log("Expenses saved successfully!");
      }
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  return (
    <div className="container border p-5 mt">
      <div className="col-md-10 mb-4 mx-auto p-0">
        <div className="date-flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Month/Year"}
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

export default Expenses;
