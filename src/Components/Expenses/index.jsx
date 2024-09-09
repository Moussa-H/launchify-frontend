import React from "react";
import { TextField, Button, div } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css"

const Expenses = () => {
  const handleSave = () => {
    // Add your save logic here
    console.log("Expenses saved!");
  };

  return (
    <div className="container border p-5 mt">
      <div className="date-flex">
        <LocalizationProvider dateAdapter={AdapterDayjs} variant="filled">
          <DatePicker label={"Month/Year"} views={["month", "year"]} />
        </LocalizationProvider>
      </div>

      <div className="row display-center">
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Office Rent"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Maintenance"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Marketing"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Software Licenses"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Legal & Accounting"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Office Supplies"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <TextField
            label="Miscellaneous"
            type="number"
            variant="filled"
            fullWidth
            className="mt-4"
          />
        </div>

        <div className="mt-4 btn-save">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
