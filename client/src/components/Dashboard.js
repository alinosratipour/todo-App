import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
function Dashboard() {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://18.133.221.125:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
  
      console.log("Token:", localStorage.token);
      console.log("Response:", response);
  
      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Check if the response has content-type JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }
  
      // Parse the response only if it has content
      const responseBody = await response.text();
      const parseRes = responseBody ? JSON.parse(responseBody) : {};
  
      console.log("Parsed Response:", parseRes);
  
      setName(parseRes.firstname);
    } catch (err) {
      console.error(err.message);
    }
  }
  

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Dashboard</h1>
          </div>
          <div className="col-md-6">
            <h2>Welcome {name || "Guest"}</h2>
          </div>
        </div>

        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default Dashboard;
