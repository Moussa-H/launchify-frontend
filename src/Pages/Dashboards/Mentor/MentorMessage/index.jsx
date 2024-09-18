import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatMessages = ({ startupId = 2, mentorId =2}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ensure Echo is available
    if (!window.Echo) {
      console.error("Echo is not defined.");
      return;
    }

    // Fetch initial messages
    axios
      .get("http://localhost:8000/api/chat/messages", {
        params: { startup_id: startupId, mentor_id: mentorId },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Check the data structure
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("API response is not an array.");
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));

    // Setup Echo listener
    window.Echo.channel(`chat.${startupId}.${mentorId}`).listen(
      "ChatMessageSent",
      (event) => {
        console.log("New message event:", event.chatMessage); // Check the structure
        if (
          event.chatMessage &&
          event.chatMessage.id &&
          event.chatMessage.message
        ) {
          setMessages((prevMessages) => [...prevMessages, event.chatMessage]);
        } else {
          console.error("Invalid message format received from event.");
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      window.Echo.channel(`chat.${startupId}.${mentorId}`).stopListening(
        "ChatMessageSent"
      );
    };
  }, [startupId, mentorId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/chat/send", {
        startup_id: startupId,
        mentor_id: mentorId,
        message,
      })
      .then(() => setMessage(""))
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div>
      <div>
        {(Array.isArray(messages) ? messages : []).map((msg) => (
          <div key={msg.id}>{msg.message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatMessages;
