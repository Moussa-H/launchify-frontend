// Progress.js
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const Progress = ({ progress }) => (
  <Box sx={{ width: "100%", mb: 4 }}>
    <Typography variant="caption" color="textSecondary">
      Form Completion Progress
    </Typography>
    <LinearProgress variant="determinate" value={progress} />
    <Typography variant="caption" color="textSecondary">
      {Math.round(progress)}%
    </Typography>
  </Box>
);

export default Progress;
