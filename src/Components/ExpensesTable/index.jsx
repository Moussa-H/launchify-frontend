import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import "./style.css";

const ExpensesTable = ({ token }) => {
  // State for expenses data and selected date
  const [expensesData, setExpensesData] = useState(null);
  const [date, setDate] = useState(dayjs());

  // Function to fetch data from the API
  const fetchExpensesData = async (year, month) => {
    console.log("token", token);
    console.log("year", year);
    console.log("month", month);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/totalexpenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            year: year,
            month: month,
          },
        }
      );
      console.log("response.data.data", response.data);
      setExpensesData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount and when date changes
  useEffect(() => {
    const selectedYear = date.year();
    const selectedMonth = date.month() + 1; // dayjs months are zero-indexed
    fetchExpensesData(selectedYear, selectedMonth);
  }, [date, token]);

  return (
    <Container>
      <div className="flex-title">
        <Typography variant="h4" gutterBottom className="title-graph">
          Monthly Expenses Table
        </Typography>

        {/* Date Picker for Month/Year */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="date-finance"
            views={["year", "month"]}
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </div>

      {/* Table for displaying expenses */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Expense Category</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {expensesData && expensesData.expenses && expensesData.expenses[0] ? (
            <>
              <tr>
                <td>Salaries</td>
                <td>
                  {"$"}
                  {expensesData.total_salaries}
                </td>
              </tr>
              <tr>
                <td>Office Rent</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].office_rent}
                </td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].marketing}
                </td>
              </tr>
              <tr>
                <td>Legal & Accounting</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].legal_accounting}
                </td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].maintenance}
                </td>
              </tr>
              <tr>
                <td>Software Licenses</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].software_licenses}
                </td>
              </tr>
              <tr>
                <td>Office Supplies</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].office_supplies}
                </td>
              </tr>
              <tr>
                <td>Miscellaneous</td>
                <td>
                  {"$"}
                  {expensesData.expenses[0].miscellaneous}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2">
                No expense data available for the selected month.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExpensesTable;
