import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";

const ChatMessages = () => {
  const { startupId, mentorId, senderType } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [mentor, setMentor] = useState({ name: "", industry: "", image: "" });
  const token = localStorage.getItem("token");

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/chat/messages/${mentorId}/${startupId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.status === "success") {
        setMessages(response.data.messages);
      } else {
        console.error("Failed to fetch messages:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [mentorId, startupId, token]);

  const fetchMentor = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/mentor/${mentorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.status === "success") {
        const { full_name, industry } = response.data.mentor;
        setMentor({
          name: full_name,
          industry,
          image: response.data.mentor.image_url,
        });
      }
    } catch (error) {
      console.error("Error fetching mentor details:", error);
    }
  }, [mentorId, token]);

  useEffect(() => {
    fetchMessages();
    fetchMentor();
    // Echo channel setup omitted for brevity
  }, [fetchMessages, fetchMentor, startupId, mentorId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      sender_type: senderType,
      startup_id: startupId,
      mentor_id: mentorId,
      message,
    };
    const currentTime = formatTime(new Date());
    const newMessage = { ...payload, time: currentTime };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/chat/message/send",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.message) {
        console.error("Failed to send message:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const Message = ({ msg }) => {
    const isSenderStartup = msg.sender_type === "startup";
    const isCurrentUserStartup = senderType === "startup";
    const alignRight = isSenderStartup === isCurrentUserStartup;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: alignRight ? "row-reverse" : "row",
          mb: 2,
          alignItems: "flex-end",
        }}
      >
        <Paper
          sx={{
            p: 2,
            maxWidth: "70%",
            borderRadius: 2,
            bgcolor: alignRight ? "#d1e7dd" : "#e9ecef",
            m: 1,
          }}
        >
          <Typography variant="body1">{msg.message}</Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", textAlign: "right", mt: 1 }}
          >
            {msg.time}
          </Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "100%",
        p: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          bgcolor: "#1976d2",
          color: "white",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Avatar
          src={mentor.image}
          alt={mentor.name}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">{mentor.name}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {mentor.industry}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Message key={`${msg.sender_type}-${index}`} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          size="small"
          sx={{ mr: 1 }}
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatMessages;
