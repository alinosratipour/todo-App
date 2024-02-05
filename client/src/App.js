import React, { Fragment } from "react";
import ToDoContextProvider from "./context/MyContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import SecureRoute from "./components/SecureRoute";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ToDoContextProvider>
      <Fragment>
        <Router>
          <Switch>
            <NavBar />
          </Switch>
          <div className="container">
            <Switch>
              <Route exact path="/signup" render={() => <Signup />} />
              <SecureRoute exact path="/login" />
              {/* <SecureRoute exact path="/dashboard" /> */}
              <Route exact path="/dashboard" render={() => <Dashboard />} />
            </Switch>
          </div>
        </Router>
      </Fragment>
    </ToDoContextProvider>
  );
}

export default App;
