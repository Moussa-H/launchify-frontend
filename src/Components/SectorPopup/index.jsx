import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SectorPopup = ({ open, onClose }) => {
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);

  useEffect(() => {
    // Fetch sectors from API
    axios
      .get("http://localhost:8000/api/sectors")
      .then((response) => setSectors(response.data))
      .catch((error) => console.error("Error fetching sectors:", error));
  }, []);

  const handleSectorClick = (sector) => {
    setSelectedSectors((prevSelected) => {
      if (prevSelected.includes(sector.id)) {
        return prevSelected.filter((id) => id !== sector.id);
      } else {
        if (prevSelected.length < 5) {
          return [...prevSelected, sector.id];
        }
        return prevSelected;
      }
    });
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Selected Sectors:", selectedSectors);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Select Sectors
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div
          className="sector-popup-content"
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ width: "100%", marginBottom: "16px" }}
          >
            Selected {selectedSectors.length} of 5 sectors
          </Typography>
          {sectors.map((sector) => (
            <Button
              key={sector.id}
              variant={
                selectedSectors.includes(sector.id) ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => handleSectorClick(sector)}
              style={{ flexGrow: 1, minWidth: "120px", marginBottom: "8px" }} // Flexible width for dynamic rows
            >
              {sector.name}
            </Button>
          ))}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectorPopup;
