import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import "./style.css";


const API_URL = "http://localhost:8000/api/investor";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const investmentSources = [
  "Business Angel",
  "Accelerator / Incubator",
  "VC Fund",
  "Corporate",
  "Public grant",
  "Crowd",
];

const Profile = () => {
  const [investorId, setInvestorId] = useState(null);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    description: "",
    email: "",
    phone_number: "",
    investment_source: "",
    linkedin_url: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchInvestorProfile();
  }, []);

  const fetchInvestorProfile = async () => {
    try {
      const response = await axios.get(API_URL, { headers });

      if (response.data.status === "success") {
        const investor = response.data.investors[0];
        setInvestorId(investor.id);
        setFormValues({
          first_name: investor.first_name || "",
          last_name: investor.last_name || "",
          description: investor.description || "",
          email: investor.email || "",
          phone_number: investor.phone_number || "",
          investment_source: investor.investment_source || "",
          linkedin_url: investor.linkedin_url || "",
        });
        setIsUpdating(true);
      } else if (response.data.status === "error") {
        resetForm();
        setIsUpdating(false);
      }
    } catch (error) {
      setError("Error fetching profile. Please try again later.");
      console.error("Error fetching profile:", error);
    } 
  };

  const resetForm = () => {
    setFormValues({
      first_name: "",
      last_name: "",
      description: "",
      email: "",
      phone_number: "",
      investment_source: "",
      linkedin_url: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null); // Reset success message
    try {
      const payload = { ...formValues };

      if (isUpdating) {
        await axios.put(`${API_URL}/${investorId}`, payload, { headers });
        setSuccess("Profile updated successfully!");
      } else {
        await axios.post(API_URL, payload, { headers });
        setSuccess("Profile saved successfully!");
      }
    } catch (error) {
      setError("Error saving profile. Please try again later.");
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
      if (error) {
        setTimeout(() => setError(null), 4000);
      }
    }
  };

  return (
    <div className="container border py-5 mt-80">
      <div className="row display-center px-4">
        {loading ? (
          <div className="col-12 text-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="col-12">
              <h4 className="mb-4 fs-7">COMPANY REVIEW</h4>
            </div>
            {error && (
              <div className="col-12 mb-4">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            {success && (
              <div className="col-12 mb-4">
                <Alert severity="success">{success}</Alert>
              </div>
            )}
            {Object.keys(formValues).map((key) =>
              key === "investment_source" ? (
                <div key={key} className="col-12 col-md-6 mb-4">
                  <FormControl fullWidth variant="filled" className="mt-4">
                    <InputLabel id="investment-source-label">
                      Investment Source
                    </InputLabel>
                    <Select
                      labelId="investment-source-label"
                      name="investment_source"
                      value={formValues[key]}
                      onChange={handleInputChange}
                      required
                    >
                      {investmentSources.map((source) => (
                        <MenuItem key={source} value={source}>
                          {source}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : (
                <div
                  key={key}
                  className={
                    key === "description"
                      ? "col-12 col-md-12 mb-4"
                      : "col-12 col-md-6 mb-4"
                  }
                >
                  <TextField
                    label={key.replace("_", " ").toUpperCase()}
                    variant="filled"
                    fullWidth
                    className="mt-4"
                    required
                    name={key}
                    value={formValues[key]}
                    onChange={handleInputChange}
                  />
                </div>
              )
            )}

            <div className="col-md-12 mb-4 mx-auto p-0">
              <div className="mt-4 btn-save px-3">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {isUpdating ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
