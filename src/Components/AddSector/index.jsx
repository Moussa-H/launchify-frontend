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
} from "@mui/material";
import "./style.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const AddSector = ({ sectors, startupId=null }) => {

  const [open, setOpen] = useState(false);
  const [allSectors, setAllSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [displaySectors, setDisplaySectors] = useState(sectors);
  const token = localStorage.getItem("token");
  console.log("sectors", sectors);

  useEffect(() => {
    if (open) {
      // Fetch sectors when the dialog is opened
      axios
        .get("http://localhost:8000/api/sectors", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request header
          },
        })
        .then((response) => {
          setAllSectors(response.data);

          // Set selected sectors based on props
          const startupSectorIds = displaySectors.map((sector) => sector.id);
          setSelectedSectors(startupSectorIds);
        })
        .catch((error) => {
          console.error("There was an error fetching the sectors!", error);
        });
    }
  }, [open]);

  useEffect(() => {
    if (sectors && sectors.length > 0) {
      setDisplaySectors(sectors); // Update state when sectors prop changes
    }
  }, [sectors]);

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
    const sectorData = selectedSectors.map((id) => {
      const sector = allSectors.find((sector) => sector.id === id);
      return { id: sector.id, name: sector.name }; // Include both id and name
    });
    axios
      .post(
        `http://localhost:8000/api/sectors/${startupId}`,
        { sectors: sectorData }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Sectors updated successfully:", response.data);
        setOpen(false); // Close the dialog after successful API call

        const updatedSectors = sectorData.filter((sector) =>
          selectedSectors.includes(sector.id)
        );
        console.log("selectedSectors", selectedSectors);
        console.log("updatedSectors", updatedSectors);
        setDisplaySectors(updatedSectors);
      })
      .catch((error) => {
        console.error("There was an error updating the sectors!", error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {displaySectors.map((sector) => (
          <Typography key={sector.id} variant="body2" className="sector-name">
            {sector.name}
          </Typography>
        ))}

        <Button
          className="btn-add-sector"
          startIcon={<AddIcon className="btn-plus" />}
          onClick={() => setOpen(true)}
        >
          Add Sector
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Select Sectors
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
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
            {allSectors.length > 0 ? (
              allSectors.map((sector) => (
                <Button
                  key={sector.id}
                  variant={
                    selectedSectors.includes(sector.id)
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  onClick={() => handleSectorClick(sector)}
                  style={{
                    flexGrow: 1,
                    minWidth: "120px",
                    marginBottom: "8px",
                    borderRadius: "40px",
                  }}
                >
                  {sector.name}
                </Button>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No sectors available.
              </Typography>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSector;
