import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageUpload = ({ image, setImage, setFormData }) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

const handleImageChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile); // Create URL for the preview
    setImage(imageUrl); // Set the image state with the preview URL
    setFormData((prevData) => ({
      ...prevData,
      image: selectedFile, // Update formData with the actual file
    }));
  }
};

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

const handleDrop = (event) => {
  event.preventDefault();
  setDragging(false);
  const file = event.dataTransfer.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Create URL for the preview
    setImage(imageUrl); // Set the image state with the preview URL
    setFormData((prevData) => ({ ...prevData, image: file })); // Store the actual file in formData
  }
};



  return (
    <div
      className={`upload-box ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      {image ? (
        <img
          src={image}
          alt="Preview"
          className="img-fluid preview-image"
          key={image} // Add key to force re-render
        />
      ) : (
        <div className="text-center">
          {dragging ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & Drop or Click to Upload</p>
          )}
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
