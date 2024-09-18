import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

// Base API URL and headers
const token = localStorage.getItem("token");
const API_URL = "http://localhost:8000/api/investor";
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const Profile = () => {
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

  useEffect(() => {
    fetchInvestorProfile();
  }, []);

  // Fetch investor profile data
  const fetchInvestorProfile = async () => {
    try {
      const response = await axios.get(API_URL, { headers });

      if (response.data.status === "success") {
        const investor = response.data.investors[0]; // Assuming there's only one investor profile
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
      console.error("Error fetching profile:", error);
    }
  };

  // Reset form fields
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

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle saving or updating profile
  const handleSave = async () => {
    try {
      const payload = { ...formValues };

      if (isUpdating) {
        await axios.put(API_URL, payload, { headers }); // Update profile
        console.log("Profile updated successfully!");
      } else {
        await axios.post(API_URL, payload, { headers }); // Save new profile
        console.log("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="container border p-5 mt">
      <div className="row display-center">
        {Object.keys(formValues).map((key) => (
          <div
            key={key}
            className={
              key === "description"
                ? "col-12 col-md-12 mb-4"
                : "col-12 col-md-5 mb-4"
            }
          >
            <div>{key}</div>
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
        ))}

        <div className="col-md-10 mb-4 mx-auto p-0">
          <div className="mt-4 btn-save px-3">
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isUpdating ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
