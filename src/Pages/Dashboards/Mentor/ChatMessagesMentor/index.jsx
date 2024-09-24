import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../../../../axiosInstance";
import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./style.css"
import { useParams } from "react-router-dom";

const ChatMessagesMentor = () => {
  const { startupId, mentorId, senderType } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [mentor, setMentor] = useState({ name: "", industry: "", image: "" });
  const [startup, setStartup] = useState({ name: "", industry: "" }); // State for startup info
  const token = localStorage.getItem("token");

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/chat/messages/${mentorId}/${startupId}`,
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
      const response = await axiosInstance.get(`/mentor/${mentorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const fetchStartup = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/startup/${startupId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.status === "success") {
        const { company_name, industry } = response.data.startup;
        setStartup({
          name: company_name,
          industry,
        });
      }
    } catch (error) {
      console.error("Error fetching startup details:", error);
    }
  }, [startupId, token]);

  useEffect(() => {
    fetchMessages();
    fetchMentor();
    fetchStartup();
  }, [fetchMessages, fetchMentor, fetchStartup, startupId, mentorId]);

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
      await axiosInstance.post("chat/message/send", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const Message = ({ msg }) => {
    const isSenderMentor = msg.sender_type === "mentor";
    const alignRight = isSenderMentor;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: alignRight ? "row" : "row-reverse",
          mb: 2,
          alignItems: "flex-end",
        }}
      >
        <div className="flex-messages">
          <Paper
            sx={{
              p: 2,
              maxWidth: "70%",
              borderRadius: 2,
              bgcolor: "#e9ecef",
              display: "flex",
              m: 1,
            }}
          >
            <Typography variant="body1">{msg.message}</Typography>
          </Paper>
          <Typography
            variant="caption"
            sx={{ display: "block", textAlign: "right", mt: 1 }}
          >
            {msg.time}
          </Typography>
        </div>
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
        
        <Box sx={{ ml: 4 }}>
          <Typography variant="h6">{startup.name}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {startup.industry}
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

export default ChatMessagesMentor;
