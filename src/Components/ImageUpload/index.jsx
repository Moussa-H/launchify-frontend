import React from "react";
import { Box } from "@mui/material";

const ImageUpload = ({ image, setImage }) => {
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Box
      sx={{
        width: "170px",
        height: "170px",
        border: "2px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
        position: "relative",
      }}
      onClick={() => document.getElementById("imageUpload").click()}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <span>Select Image</span>
      )}
      <input
        accept="image/*"
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ImageUpload;
