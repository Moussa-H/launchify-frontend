import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import "./style.css";

const API_URL = "http://localhost:8000/api/mentor";

const Profile = ({ token }) => {
  const [mentorId, setMentorId] = useState(null);
  const [formValues, setFormValues] = useState({
    full_name: "",
    industry: "",
    expertise: "",
    description: "",
    phone_number: "",
    location: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchMentorProfile();
  }, [token]);

  const fetchMentorProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, { headers });
      if (response.data.status === "success") {
        const mentor = response.data.mentors[0];
        setMentorId(mentor.id);
        setFormValues({
          full_name: mentor.full_name || "",
          industry: mentor.industry || "",
          expertise: mentor.expertise || "",
          description: mentor.description || "",
          phone_number: mentor.phone_number || "",
          location: mentor.location || "",
          image: mentor.image_url || null,
        });
      } else {
        resetForm();
      }
    } catch (error) {
      setError("Error fetching profile. Please try again later.");
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      full_name: "",
      industry: "",
      expertise: "",
      description: "",
      phone_number: "",
      location: "",
      image: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      image: event.target.files[0],
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    const formData = new FormData();

    // Append each form value to FormData, except for the image if it hasn't changed
    for (const [key, value] of Object.entries(formValues)) {
      if (key === "image" && value === formValues.image) {
        // Skip appending the image if it hasn't changed
        continue;
      }
      formData.append(key, value);
    }

    try {
      console.log("formData", formData);
      console.log("token", token);
      console.log("formValues", formValues);

      // Check if the image file has changed
      const imageChanged = formValues.image && formValues.image instanceof File;

      // Set content type based on whether the image has changed
      const contentType =
        imageChanged || formValues.image
          ? "multipart/form-data"
          : "application/json";

      // Prepare the request data
      const requestData =
        imageChanged || formValues.image
          ? formData
          : JSON.stringify(formValues);
 console.log("requestData", requestData);
      // Make the API call based on whether the mentorId exists
      if (mentorId) {
        await axios.post(`${API_URL}/${mentorId}`, requestData, {
          headers: {
            ...headers,
            "Content-Type": contentType, // Dynamic content type
          },
        });
        setSuccess("Profile updated successfully!");
      } else {
        await axios.post(API_URL, requestData, {
          headers: {
            ...headers,
            "Content-Type": contentType, // Dynamic content type
          },
        });
        setSuccess("Profile saved successfully!");
      }
    } catch (error) {
      setError("Error saving profile. Please try again later.");
      console.error("Error saving profile:", error);
    }
  };



  return (
    <div className="container border py-4 mt-5">
      <div className="row display-center px-4">
        {loading ? (
          <div className="col-12 text-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="col-12">
              <h4 className="mb-4 fs-7">MENTOR PROFILE</h4>
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

            {/* Image and Full Name side by side */}
            <Grid container spacing={3} alignItems="center" >
              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    paddingLeft: "0px!important",
                    width: "170px",
                    height: "170px",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  {formValues.image ? (
                    <img
                      src={
                        typeof formValues.image === "object"
                          ? URL.createObjectURL(formValues.image)
                          : formValues.image
                      }
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                    />
                  ) : (
                    <span>Select Image</span>
                  )}
                </Box>
                <input
                  accept="image/*"
                  type="file"
                  id="imageUpload"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Grid>

              <Grid item xs={12} md={10}>
                <TextField
                  label="Full Name"
                  variant="standard"
                  fullWidth
                  className="mt-4"
                  required
                  name="full_name"
                  value={formValues.full_name}
                  onChange={handleInputChange}
                />

                <TextField
                  label="Description"
                  variant="standard"
                  fullWidth
                  className="mt-4"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  multiline
                  placeholder="Add a short description of your expertise, experience, and what you offer as a mentor to help others."
                />
              </Grid>
            </Grid>

            {/* Rest of the form */}
            <div className="col-12 col-md-6 mb-2 mt-4">
              <TextField
                label="Industry"
                variant="filled"
                fullWidth
                className="mt-4"
                required
                name="industry"
                value={formValues.industry}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 mb-2  mt-4">
              <TextField
                label="Expertise"
                variant="filled"
                fullWidth
                className="mt-4"
                required
                name="expertise"
                value={formValues.expertise}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 col-md-6 mb-4  ">
              <TextField
                label="Phone Number"
                variant="filled"
                fullWidth
                className="mt-4"
                name="phone_number"
                value={formValues.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <TextField
                label="Location"
                variant="filled"
                fullWidth
                className="mt-4"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12 mb-4 mx-auto p-0">
              <div className="mt-4 btn-save px-3">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {mentorId ? "Update" : "Save"}
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
