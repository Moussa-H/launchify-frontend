import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import "./style.css";

const Messages = ({ token }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:8000/api/getRequests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setData(response.data.data);
          setFilteredData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [token]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateRequestStatus = (startupId, status) => {
    return axios.post(
      "http://localhost:8000/api/sendResponse",
      { startup_id: startupId, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const handleAccept = (id) => {
    updateRequestStatus(id, "accepted")
      .then((response) => {
        if (response.data.status === "success") {
          setFilteredData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error("There was an error updating the request status!", error);
      });
  };

  const handleReject = (id) => {
    updateRequestStatus(id, "rejected")
      .then((response) => {
        if (response.data.status === "success") {
          setFilteredData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error("There was an error updating the request status!", error);
      });
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "15%" }}>Company</TableCell>
              <TableCell sx={{ width: "25%" }}>Description</TableCell>
              <TableCell sx={{ width: "15%" }}>Country</TableCell>
              <TableCell sx={{ width: "15%" }}>Industry</TableCell>
              <TableCell sx={{ width: "20%" }}>Sectors</TableCell>
              <TableCell sx={{ width: "10%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.company_name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.industry}</TableCell>
                  <TableCell>
                    {item.sectors.map((sector) => (
                      <div key={sector.id}>{sector.name}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex-btn">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAccept(item.id)}
                        style={{ marginRight: "8px" }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleReject(item.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Paper>
  );
};

export default Messages;
