import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PieChart } from "@mui/x-charts/PieChart";

const GraphIncomes = ({ token }) => {
  const [incomeData, setIncomeData] = useState(null);
  const [date, setDate] = useState(dayjs());

  // Function to fetch income data from the API
  const fetchIncomeData = async (year, month) => {
    try {
      const response = await axios.get("http://localhost:8000/api/incomes", {
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
        {
          data: [
            { id: 0, value: incomeData.product_sales, label: "Product Sales" },
            {
              id: 1,
              value: incomeData.service_revenue,
              label: "Service Revenue",
            },
            {
              id: 2,
              value: incomeData.subscription_fees,
              label: "Subscription Fees",
            },
            {
              id: 3,
              value: incomeData.investment_income,
              label: "Investment Income",
            },
          ],
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]
    : [];

  return (
    <Container>
      <div className="flex-title">
        <Typography variant="h4" gutterBottom className="title-graph">
          Monthly Income Breakdown
        </Typography>

        {/* Date Picker for Month/Year */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </div>

      {/* Flexbox container for pie chart and legend */}
      <Box >
        {/* Pie chart container */}
        <Box >
          {incomeData ? (
            <PieChart series={pieChartData} width={300} height={300} />
          ) : (
            <Typography variant="body1" className="mt-3">
              No income data available for the selected month.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default GraphIncomes;
