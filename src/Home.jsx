import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      try {
        const res = await axios.get("api/users/get_user/", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });

        // Set the user data to state
        setData(res.data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", err);
      }
    };

    // Check if user is authenticated
    const token = Cookies.get("accessToken");
    if (token) {
      fetchData(); // Call the async function
    } else {
      setError("You are not logged in.");
    }

  }, []); // Empty dependency array to run the effect only once on mount


  const handleLogout = async () => {
    try {
      // Send logout request to the backend
      await axios.post(
        "http://127.0.0.1:8000/api/users/logout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      // Remove authentication cookies
      Cookies.remove("accessToken");
      Cookies.remove("csrftoken");
      Cookies.remove("sessionid");

      // Redirect to login page after logout
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to log out. Please try again.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data ? (
        <>
          <h2>Welcome, {data[0].username}</h2>
          <div>
            <button onClick={handleLogout}>
              {Cookies.get("accessToken") ? "Logout" : "Login"}
            </button>
          </div>
        </>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
}
