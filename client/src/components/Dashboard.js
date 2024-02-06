import React, { Fragment, useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState(""); // State to store the user's name
  const location = useLocation();

  useEffect(() => {
    // Function to fetch the user's data from the backend
    const fetchUserData = async () => {
      try {
        const userId = location.state.userId;
        const response = await fetch("http://18.133.221.125:5000/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "User-Id": userId, // Add the user ID to the headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.firstname); // Assuming the response contains the user's firstname
        } else {
          console.error("Failed to fetch user's data");
        }
      } catch (error) {
        console.error("Error fetching user's data:", error.message);
      }
    };

    // Fetch user data when component mounts
    fetchUserData();
  }, [location.state.userId]); // Include userId in the dependency array to re-fetch data when userId changes

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Dashboard</h1>
          </div>
          <div className="col-md-6">
            {/* Display the user's name */}
            <h2>Welcome {name || "Guest"}</h2>
          </div>
        </div>

        {/* Pass the handleLogin function to the login component */}
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default Dashboard;
