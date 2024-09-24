import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const GraphIncomes = ({ token }) => {
  const [incomeData, setIncomeData] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  // Function to fetch income data from the API
  const fetchIncomeData = async (year, month) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/incomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          year: year,
          month: month,
        },
      });
      setIncomeData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or when date changes
  useEffect(() => {
    const selectedYear = date.year();
    const selectedMonth = date.month() + 1; // dayjs months are zero-indexed
    fetchIncomeData(selectedYear, selectedMonth);
  }, [date, token]);

  // Pie chart data setup
  const pieChartData = incomeData
    ? [
        { name: "Product Sales", value: incomeData.product_sales },
        { name: "Service Revenue", value: incomeData.service_revenue },
        { name: "Subscription Fees", value: incomeData.subscription_fees },
        { name: "Investment Income", value: incomeData.investment_income },
      ]
    : [];

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <div className="flex-title mt-0">
          <Typography variant="h4" gutterBottom className="title-graph">
            Monthly Income Breakdown
          </Typography>

          {/* Date Picker for Month/Year */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </div>
      </Box>

      {/* Chart container */}
      <Box display="flex" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : incomeData ? (
          <PieChart width={400} height={310}>
            <Pie
              data={pieChartData}
              dataKey="value"
              outerRadius={100}
              fill="#8884d8"
              label
              
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <Typography variant="body1">
            No income data available for the selected month.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default GraphIncomes;
