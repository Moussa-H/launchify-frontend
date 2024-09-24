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
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import StartupDetails from "../StartupDetails"; // Import the StartupDetails component
import "./style.css";

const API_URL = "/startups";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const Startups = () => {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStartupId, setSelectedStartupId] = useState(null); // State for selected startup ID
  const navigate = useNavigate();
  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const response = await axiosInstance.get(API_URL, { headers });
      if (response.data.status === "success") {
        setStartups(response.data.startups);
      }
    } catch (error) {
      console.error("Error fetching startups:", error);
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

 const handleDetailsClick = (id) => {
   navigate(`details/${id}`); // Fixed navigation path
 };
 const handleInvestClick = (id) => {
   navigate(`investment/${id}`); // Fixed navigation path
 };
  const filteredStartups = startups.filter(
    (startup) =>
      startup.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.sectors.some((sector) =>
        sector.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const paginatedStartups = filteredStartups.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      {selectedStartupId ? (
        <StartupDetails startupId={selectedStartupId} /> // Pass startupId to StartupDetails component
      ) : (
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
                  <TableCell sx={{ width: "20%" }}>Country</TableCell>
                  <TableCell sx={{ width: "20%" }}>Sectors</TableCell>
                  <TableCell sx={{ width: "20%" }}>Stage</TableCell>
                  <TableCell sx={{ width: "20%" }}>Investment Size</TableCell>
                  <TableCell sx={{ width: "20%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStartups.map((startup) => (
                  <TableRow key={startup.id}>
                    <TableCell sx={{ width: "20%" }} className="name-bold">
                      {startup.company_name}
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      {startup.country}
                    </TableCell>
                    <TableCell>
                      {startup.sectors.map((sector, index) => (
                        <div key={index} className="sectorStyle">
                          {sector.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <div className="stageStyle">{startup.company_stage}</div>
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <div>
                        {startup.currently_raising_size
                          ? `$${startup.currently_raising_size}`
                          : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <div className="btn-table">
                        <Button
                          className="btn-details"
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "8px" }}
                          onClick={() => handleDetailsClick(startup.id)}
                          handleInvestClick
                        >
                          Details
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="btn-invest"
                          onClick={() => handleInvestClick(startup.id)}
                        >
                          Invest
                        </Button>
                      </div>
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
      )}
    </div>
  );
};

export default Startups;
