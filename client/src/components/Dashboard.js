import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
function Dashboard() {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://18.133.221.125:5000/dashboard", {
        method: "GET",
       // headers: { token: localStorage.token },
       // headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      console.log("Token:", localStorage.token);
      console.log("Response:", response);
      const parseRes = await response.json();
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
