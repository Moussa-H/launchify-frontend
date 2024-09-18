import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./style.css"

const MonthlyBreakdownChart = ({ token }) => {
  const [data, setData] = useState({ incomes: {}, expenses: {} });
  const [maxIncome, setMaxIncome] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([new Date().getFullYear()]); // Start with current year

  const CustomXAxis = (props) => <XAxis {...props} />;
  const CustomYAxis = (props) => <YAxis {...props} />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/monthly-breakdown",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              year: selectedYear,
            },
          }
        );
        const { data: responseData, max_income, max_expense } = response.data;

        setData(responseData);
        setMaxIncome(parseFloat(max_income));
        setMaxExpense(parseFloat(max_expense));
      } catch (error) {
        console.error("Failed to fetch monthly breakdown data", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  // Prepare data for the chart
  const chartData = [];
  for (let month = 1; month <= 12; month++) {
    chartData.push({
      month: new Date(0, month - 1).toLocaleString("en-US", { month: "short" }),
      income: data.incomes?.[month]
        ? parseFloat(data.incomes[month].total_income)
        : 0,
      expense: data.expenses?.[month]
        ? parseFloat(data.expenses[month].total_expense)
        : 0,
    });
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= 2000; i--) {
      yearsList.push(i);
    }
    setYears(yearsList);
  };

  useEffect(() => {
    generateYears();
  }, []);

  return (
    <>
      <div className="flex-title">
        <Typography variant="h4" gutterBottom className="title-graph">
          Monthly Financial Breakdown
        </Typography>
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ mb: 2, width: "100px" }}
        >
          <InputLabel id="year-select-label"></InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, Math.max(maxIncome, maxExpense)]} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            layout="vertical"
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyBreakdownChart;
