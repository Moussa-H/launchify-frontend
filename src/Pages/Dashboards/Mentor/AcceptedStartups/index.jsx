import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";

const API_URL = "http://localhost:8000/api/getstartupsaccepted";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const AcceptedStartups = ({ mentorId=5 }) => {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const response = await axios.get(API_URL, { headers });
      if (response.data.status === "success") {
        setStartups(response.data.startups);
      }
    } catch (error) {
      console.error("Error fetching accepted startups:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChatClick = (startupId) => {
    console.log("startupId", startupId);
   const senderType="mentor";
    // Navigate to the chat interface for the selected startup
    navigate(`${mentorId}/${startupId}/${senderType}`);
  };

  const filteredStartups = startups.filter(
    (startup) =>
      startup.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (startup.country &&
        startup.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedStartups = filteredStartups.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TextField
        variant="outlined"
        placeholder="Search"
        onChange={handleSearch}
        value={searchTerm}
        className="search-table"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>Company</TableCell>
              <TableCell sx={{ width: "20%" }}>Description</TableCell>
              <TableCell sx={{ width: "20%" }}>Industry</TableCell>
              <TableCell sx={{ width: "20%" }}>Founding Year</TableCell>
              <TableCell sx={{ width: "20%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStartups.map((startup) => (
              <TableRow key={startup.id}>
                <TableCell sx={{ width: "20%" }}>
                  {startup.company_name}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {startup.description}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>{startup.industry}</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {startup.founding_year || "N/A"}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleChatClick(startup.id)}
                  >
                    <ChatIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStartups.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default AcceptedStartups;
