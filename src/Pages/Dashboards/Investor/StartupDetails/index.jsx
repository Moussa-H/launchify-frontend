import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../axiosInstance";
import { Paper, Grid, Typography } from "@mui/material";
import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "/startup";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const StartupDetails = () => {
  const navigate = useNavigate();
  const { startupId } = useParams();
  console.log(startupId);
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    fetchStartupDetails();
  }, [startupId]);

  const fetchStartupDetails = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${startupId}`, {
        headers,
      });
      if (response.data.status === "success") {
        setStartup(response.data.startup);
      }
      console.log("response.data.startup", response.data.startup);
    } catch (error) {
      console.error("Error fetching startup details:", error);
    }
  };

  if (!startup) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ArrowBackIcon
        style={{ cursor: "pointer", marginBottom: "16px" }}
        onClick={() => navigate("/investor-dashboard/startups")} // Navigate back to /startups
      />
      <Paper style={{ padding: "16px" }} className="px-5">
        {/* Section 1: Image and company name/description */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <img
              className="img-detail"
              src={startup.image}
              alt={startup.company_name}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" gutterBottom>
              {startup.company_name}
            </Typography>
            <Typography variant="body1">{startup.description}</Typography>
          </Grid>
        </Grid>

        <div className="container-border">
          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Founder</Typography>
              <Typography>{startup.founder}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Founding Year</Typography>
              <Typography>{startup.founding_year}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Country</Typography>
              <Typography>{startup.country}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Sectors</Typography>
              {startup.sectors.map((sector, index) => (
                <Typography key={index}>{sector.name}</Typography>
              ))}
            </Grid>
          </Grid>

          {/* Section 3: Industry, Business Type, Company Stage, Investment Size */}
          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Industry</Typography>
              <Typography>{startup.industry}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Business Type</Typography>
              <Typography>{startup.business_type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Company Stage</Typography>
              <Typography>{startup.company_stage}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Employees Count</Typography>
              <Typography>{startup.employees_count}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Phone Number</Typography>
              <Typography>{startup.phone_number}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Email Address</Typography>
              <Typography>{startup.email_address}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Website</Typography>
              <Typography>{startup.website_url}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                Currently Raising Type
              </Typography>
              <Typography>{startup.currently_raising_type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                Currently Raising Size
              </Typography>
              <Typography>{`$${startup.currently_raising_size}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Investment Sources</Typography>
              {startup.investment_sources.length > 0 ? (
                startup.investment_sources.map((source, index) => (
                  <Typography key={index}>
                    {source.investment_source}
                  </Typography>
                ))
              ) : (
                <Typography></Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default StartupDetails;
