
import React, { Fragment, useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

function Dashboard() {
  const [name, setName] = useState(""); // State to store the user's name

  useEffect(() => {
    // Function to fetch the user's name from the backend
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://18.133.221.125:5000/dashboard", {
          method: "GET",
          headers: {
            // Add any necessary headers here, e.g., Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.firstname); // Assuming the response contains the user's firstname
        } else {
          console.error("Failed to fetch user's name");
        }
      } catch (error) {
        console.error("Error fetching user's name:", error.message);
      }
    };

    // Call the fetchUserName function when the component mounts
    fetchUserName();
  }, []);

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
