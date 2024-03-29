import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
function Dashboard() {
  const [name, setName] = useState("");


  useEffect(() => {
    // Function to fetch the user's data from the backend
    const fetchUserData = async () => {
      try {
       // const token = localStorage.getItem("token"); // Retrieve user ID from localStorage
        const response = await fetch("http://18.170.65.18:5000/dashboard", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.firstname); 
        } else {
          console.error("Failed to fetch user's data");
        }
      } catch (error) {
        console.error("Error fetching user's data:", error.message);
      }
    };

    // Fetch user data when component mounts
    fetchUserData();
  }, []); //  

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>New Dashboard</h1>
          </div>
          <div className="col-md-6">
            <h2>Welcome {name}</h2>
          </div>
        </div>

        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default Dashboard;
