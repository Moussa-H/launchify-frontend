import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  TextField,
  Pagination,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MessageCircleMore, CornerUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupSendRequest from "../../../../Components/PopupSendRequest"; // Adjust path as needed
import "./style.css";

const MentorDirectory = () => {
    const [startupid, setStartupId] = useState("");
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6; // Display 6 mentors per page
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State for the request popup
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status === "success") {
         setStartupId(response.data.startupId);
          console.log(response);
          setMentors(response.data.mentors);
          setFilteredMentors(response.data.mentors);
    
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [token]);

  // Handle search filtering
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = mentors.filter((mentor) =>
      mentor.full_name.toLowerCase().includes(value)
    );
    setFilteredMentors(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Paginate mentors
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors.slice(
    indexOfFirstMentor,
    indexOfLastMentor
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return { color: "green" };
      case "rejected":
        return { color: "orange" };
      default:
        return {};
    }
  };
  const senderType = "startup";

  const handleIconClick = (status, mentorId) => {
    if (status === "accepted") {
      navigate(`chats/${mentorId}/${startupid}/${senderType}`); // Navigate to the chat page with mentorId
    } else if (status === "none") {
      // Open the popup if the status is "none" (for sending a request)
      setSelectedMentorId(mentorId);
      setIsPopupOpen(true);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedMentorId(null);
  };

  const handleRequestSuccess = (mentorId) => {
    // Update the status of the mentor to "pending" after sending the request
    setFilteredMentors((prevMentors) =>
      prevMentors.map((mentor) =>
        mentor.id === mentorId ? { ...mentor, status: "pending" } : mentor
      )
    );
  };

  return (
    <Box p={4}>
      <TextField
        fullWidth
        placeholder="Search"
        variant="outlined"
        className="search-cards"
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <Grid container spacing={4}>
        {currentMentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor.id}>
            <Card
              sx={{
                position: "relative",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              {mentor.status === "none" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "gray",
                  }}
                >
                  <IconButton
                    onClick={() => handleIconClick(mentor.status, mentor.id)}
                  >
                    <CornerUpRight />
                  </IconButton>
                </Box>
              )}

              <CardMedia
                component="img"
                image={mentor.image_url}
                alt={mentor.full_name}
                sx={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  margin: "0 auto",
                  position: "absolute",
                  top: "-45px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "4px solid white",
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {mentor.full_name}
                </Typography>
                <hr />
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    Industry:
                  </Typography>
                  <Typography variant="body2">{mentor.industry}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    Expertise:
                  </Typography>
                  <Typography variant="body2">{mentor.expertise}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    Phone:
                  </Typography>
                  <Typography variant="body2">{mentor.phone_number}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">
                    Location:
                  </Typography>
                  <Typography variant="body2">{mentor.location}</Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  {mentor.status !== "none" && (
                    <Typography
                      variant="body2"
                      style={getStatusStyles(mentor.status)}
                    >
                      {mentor.status === "accepted"
                        ? "Accepted"
                        : mentor.status === "pending"
                        ? "Pending"
                        : "Rejected"}
                    </Typography>
                  )}
                  {mentor.status === "accepted" ? (
                    <IconButton
                      onClick={() =>
                        navigate(
                          `chats/${mentor.id}/${startupid}/${senderType}`
                        )
                      }
                    >
                      <MessageCircleMore />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleIconClick(mentor.status, mentor.id)}
                    >
                      <MessageCircleMore />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredMentors.length / mentorsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>

      {isPopupOpen && selectedMentorId && (
        <PopupSendRequest
          mentorId={selectedMentorId}
          open={isPopupOpen}
          onClose={handlePopupClose}
          onRequestSuccess={handleRequestSuccess}
        />
      )}
    </Box>
  );
};

export default MentorDirectory;
