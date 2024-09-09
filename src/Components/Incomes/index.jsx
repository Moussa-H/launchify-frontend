import React from "react";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";

const Incomes = () => {
  const handleSave = () => {
    // Add your save logic here
    console.log("Incomes saved!");
  };

  return (
    <div className="container border p-5 mt">
      {/* Date Picker */}
      <div className="date-flex">
        <LocalizationProvider dateAdapter={AdapterDayjs} variant="filled">
          <DatePicker label={"Month/Year"} views={["month", "year"]} />
        </LocalizationProvider>
      </div>

      {/* Income Input Fields */}
      <div className="row display-center">
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Product Sales"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Service Revenue"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Subscription Fees"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Investment Income"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 btn-save">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
