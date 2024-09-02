// ImageUpload.js
import React from "react";

const ImageUpload = ({
  image,
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  onChange,
}) => (
  <div className="row mb-4">
    <div className="col-12 col-md-3 d-flex flex-column align-items-center justify-content-center">
      <div
        className={`upload-box ${dragging ? "dragging" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
      >
        {image ? (
          <img src={image} alt="Preview" className="img-fluid preview-image" />
        ) : (
          <div className="text-center">
            {dragging ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & Drop or Click to Upload</p>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        id="uploadImage"
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  </div>
);

export default ImageUpload;
