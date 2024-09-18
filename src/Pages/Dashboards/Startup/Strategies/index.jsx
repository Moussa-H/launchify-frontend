import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerateStrategies from "../../../../Components/GenerateStrategies";
import StrategiesTable from "../../../../Components/StrategiesTable";

export default function Strategies({ token }) {
  const [apiStatus, setApiStatus] = useState(null); // For holding API call status
  const [strategies, setStrategies] = useState(null); // For holding strategy data

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/strategies",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in header
            },
          }
        );
        if (response.status === 200 && response.data.status === "success") {
          setApiStatus("success");
          setStrategies(response.data.strategy); // Store the strategy data
        } else {
          setApiStatus("error");
        }
      } catch (error) {
        setApiStatus("error"); // Handle error status
      }
    };

    fetchStrategies();
  }, [token]);

  return (
    <div>
      {apiStatus === "success" ? (
        <StrategiesTable token={token} strategies={strategies} /> // Pass the strategies prop to the component
      ) : (
        <GenerateStrategies token={token} /> // Display error content if API fails
      )}
    </div>
  );
}
