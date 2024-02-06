import React, { Fragment, useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";


function Dashboard() {
  const [name, setName] = useState(""); // State to store the user's name
  async function getName() {
    try {
      const response = await fetch("/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
    //console.log("this is some id",parseRes);
      setName(parseRes.firstname);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  },[]);
 
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
