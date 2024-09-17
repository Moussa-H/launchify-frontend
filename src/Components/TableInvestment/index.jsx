import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import "./style.css"
const TableInvestment = ({token}) => {
  const [date, setDate] = useState(dayjs()); // Default to current month and year
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState([]);

  // Format the date as year and month for the API request
  const fetchInvestments = async (selectedDate) => {
    setLoading(true);
  try {
    const response = await axios.get("http://localhost:8000/api/getstartups", {
      params: {
        year: selectedDate.year(),
        month: selectedDate.month() + 1, // month is zero-indexed in dayjs, so add 1
      },
      headers: {
        Authorization: `Bearer ${token}`, // Ensure 'token' is defined correctly
        "Content-Type": "application/json",
      },
    });

    setInvestments(response.data.startups);
  } catch (error) {
    console.error("Error fetching investments:", error);
  } finally {
    setLoading(false);
  }
  };

  // Fetch investments on initial render and whenever the date changes
  useEffect(() => {
    fetchInvestments(date);
  }, [date]);

  return (
    <Box>
      <div className="flex-title">
        <h2 class="title-table"> Last Investment Startups</h2>

        {/* Date Picker for selecting Month/Year */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
      </div>
      {/* Show loading spinner while fetching data */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Needed Investment</TableCell>
                <TableCell>Amount Invested</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investments.length > 0 ? (
                investments.map((investment, index) => (
                  <TableRow key={index}>
                    <TableCell>{investment.company_name}</TableCell>
                    <TableCell>
                      {investment.needed_investment}
                      {"$"}
                    </TableCell>
                    <TableCell>
                      {investment.amount}
                      {"$"}
                    </TableCell>
                    <TableCell>{investment.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No investments found for the selected period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TableInvestment;
