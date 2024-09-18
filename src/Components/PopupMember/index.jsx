import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const PopupMember = ({
  startupId,
  token,
  open,
  handleClose,
  handleSave,
  memberToEdit,
}) => {
  const [fullname, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (memberToEdit) {
      setFullName(memberToEdit.fullname || "");
      setPosition(memberToEdit.position || "");
      setSalary(memberToEdit.salary || "");
      setIsEditing(true);
    } else {
      setFullName("");
      setPosition("");
      setSalary("");
      setIsEditing(false);
    }
  }, [memberToEdit]);

  const handleSubmit = async () => {
    try {
      let response;
      if (isEditing) {
        // Update existing member
        response = await axios.put(
          `http://localhost:8000/api/team-members/${startupId}/${memberToEdit.id}`,
          { fullname, position, salary },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        handleSave({
          id: response.data.newMemberId || memberToEdit.id, // Use new ID for new members
          fullname,
          position,
          salary,
        });
      } else {
        // Add new member
        response = await axios.post(
          `http://localhost:8000/api/team-members/${startupId}`,
          { fullname, position, salary },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        handleSave({
          id: response.data.id, // Use new ID for new members
          fullname,
          position,
          salary,
        });
      }
      setFullName("");
      setPosition("");
      setSalary("");
      // Handle success
    } catch (error) {
      console.error("Failed to save member data:", error);
      // Add more detailed error handling if needed
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("General error message:", error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditing ? "Edit Member" : "Add Member"}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          className="my-2"
          label="Full Name"
          variant="filled"
          fullWidth
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          margin="dense"
        />
        <TextField
          className="my-2"
          label="Position"
          variant="filled"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          margin="dense"
        />
        <TextField
          className="my-2"
          label="Salary"
          variant="filled"
          fullWidth
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupMember;
