import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
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
    } catch (error) {
      console.error("Failed to save member data:", error);
      // Add more detailed error handling if needed
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ position: "relative", fontWeight: 600 }}>
        {isEditing ? "Edit Member" : "Add Member"}
       
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Full Name"
          variant="filled"
          fullWidth
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          margin="dense"
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Position"
          variant="filled"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          margin="dense"
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Salary"
          variant="filled"
          fullWidth
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          margin="dense"
          style={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-end" }}>
        <Button
          onClick={handleClose}
          color="default"
          variant="contained"
          style={{ marginRight: "8px" }}
        >
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupMember;
