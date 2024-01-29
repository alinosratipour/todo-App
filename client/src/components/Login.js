import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  toast.configure();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      // const response = await fetch("/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      const response = await fetch("http://18.133.221.125:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        history.push("/dashboard");
        toast.success(" login was Successful");
      } else {
        toast.error(parseRes);
  
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={onSubmitForm} className="text-center col-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </div>
  </Fragment>
  );
}

export default Login;
