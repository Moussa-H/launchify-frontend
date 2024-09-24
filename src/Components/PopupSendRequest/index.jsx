import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import axiosInstance from "../../axiosInstance";
import { CheckCircleOutline } from "@mui/icons-material"; // Professional icon for request
import CloseIcon from "@mui/icons-material/Close"; // Icon to close the popup

const PopupSendRequest = ({
  token,
  mentorId,
  open,
  onClose,
  onRequestSuccess
}) => {
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    const token=localStorage.getItem("token");
    setLoading(true);
    console.log()
    try {
      const response = await axiosInstance.post(
        "/request",
        {
          mentor_id: mentorId,
          status: "pending",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
   console.log("response.data", response.data);
      if (response.data.status === "success") {
        onRequestSuccess(mentorId); // Trigger status update on the mentor card
        onClose(); // Close the popup after the request is successful
      }
    } catch (error) {
      console.error("Failed to send request", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={3}>
          {/* Professional Icon */}
          <CheckCircleOutline color="primary" style={{ fontSize: 80 }} />
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          Send Request to Mentor
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          To help keep people safe while making new connections, the mentor must
          accept the request before proceeding.
        </Typography>
      </DialogContent>
      <DialogActions>
        {/* "Ok" Button */}
        <Button
          onClick={handleSendRequest}
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Sending..." : "Ok"}
        </Button>
      </DialogActions>
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        style={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};

export default PopupSendRequest;
