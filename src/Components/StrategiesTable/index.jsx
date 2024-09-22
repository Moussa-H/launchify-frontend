import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { debounce } from "lodash";
import axios from "axios";
import "./style.css";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

// Helper function to format Action Steps and Challenges
const formatActionStepsAndChallenges = (description) => {
  if (!description) return null;

  const formattedDetails = [];
  let insideActionSteps = false;
  let insideChallenges = false;

  description.split("\n").forEach((line, index) => {
    if (line.startsWith("Action Steps")) {
      formattedDetails.push(
        <Typography
          key={`action-title-${index}`}
          variant="body2"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          Action Steps:
        </Typography>
      );
      insideActionSteps = true;
    } else if (line.startsWith("Challenges")) {
      formattedDetails.push(
        <Typography
          key={`challenges-title-${index}`}
          variant="body2"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          Challenges:
        </Typography>
      );
      insideChallenges = true;
    } else if (insideActionSteps && line.startsWith("- ")) {
      formattedDetails.push(
        <Typography key={`action-step-${index}`} variant="body2" sx={{ pl: 2 }}>
          {line.replace("- ", "- Step ")}
        </Typography>
      );
    } else if (insideChallenges && line.startsWith("- ")) {
      formattedDetails.push(
        <Typography key={`challenge-${index}`} variant="body2" sx={{ pl: 2 }}>
          {line.replace("- ", "- Challenge ")}
        </Typography>
      );
    }
  });

  return formattedDetails;
};

// Main component
const StrategiesTable = ({ strategies = {}, token }) => {
  console.log("strategies",strategies);
  const [expandedRows, setExpandedRows] = useState({});
  const [strategyStatus, setStrategyStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [loadedStrategies, setLoadedStrategies] = useState(strategies);

  useEffect(() => {
    const initializeStatus = () => {
      if (loadedStrategies && Object.keys(loadedStrategies).length > 0) {
        const initialStatus = Object.keys(loadedStrategies).reduce(
          (acc, key) => {
            if (key.endsWith("_status")) {
              acc[key] = loadedStrategies[key];
            }
            return acc;
          },
          {}
        );
        setStrategyStatus(initialStatus);
      }
    };

    initializeStatus();
  }, [loadedStrategies]);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/strategies",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.strategies) {
          setLoadedStrategies(response.data.strategies);
        }
      } catch (error) {
        console.error("Failed to fetch strategies:", error);
        setStatusError("Failed to load strategies. Please try again.");
      }
    };

    if (!strategies || Object.keys(strategies).length === 0) {
      fetchStrategies();
    }
  }, [strategies, token]);

  const handleToggleExpand = (rowIndex) => {
    setExpandedRows((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };

  const handleStatusChange = debounce(async (strategyKey, newStatus) => {
    setLoadingStatus(strategyKey);
    setStatusError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/strategies/update-status",
        { [strategyKey]: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setStrategyStatus((prevStatus) => ({
          ...prevStatus,
          [strategyKey]: newStatus,
        }));
      }
    } catch (error) {
      setStatusError("Failed to update status. Please try again.");
    } finally {
      setLoadingStatus(null);
    }
  });

  if (!loadedStrategies || Object.keys(loadedStrategies).length === 0) {
    return (
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col className="text-center">
          <Spinner animation="border" />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Strategies Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Title</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Detailed Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(loadedStrategies)
              .filter(
                (key) => key.startsWith("strategy_") && key.endsWith("_name")
              )
              .map((key, index) => {
                const descriptionKey = key.replace("_name", "_description");
                const statusKey = key.replace("_name", "_status");

                const name = loadedStrategies[key] || "N/A";
                const description = loadedStrategies[descriptionKey] || "";
                const status = strategyStatus[statusKey] || "todo";

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1">{name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Accordion
                        expanded={!!expandedRows[index]}
                        onChange={() => handleToggleExpand(index)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${index}-content`}
                          id={`panel-${index}-header`}
                        >
                          <Typography variant="body2">
                            {description.split("\n")[0]}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {formatActionStepsAndChallenges(description)}
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(statusKey, e.target.value)
                        }
                        variant="outlined"
                        size="small"
                        disabled={!!loadingStatus}
                      >
                        <MenuItem value="todo">Todo</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                      {statusError && (
                        <Typography
                          color="error"
                          variant="body2"
                          sx={{ ml: 2 }}
                        >
                          {statusError}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StrategiesTable;
