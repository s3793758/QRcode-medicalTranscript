import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

const defaultState = {
  accountType: "",
  email: "",
  password: "",
};
const AdminLogin = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/patientfilehome" />;
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const allFieldsEntered = Object.keys(state).every(
      (key) => state[key].trim() !== ""
    );
    if (!allFieldsEntered) {
      setErrorMsg("Please enter all the field values");
      return;
    }
    try {
      console.log({ state });
      const { data } = await axios.post(`${BASE_API_URL}/adminlogin`, {
        ...state,
      });
      setSuccesMsg("Login successful");
      localStorage.setItem(state.accountType, JSON.stringify(data));
      localStorage.setItem("accountType", JSON.stringify(state.accountType));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      setErrorMsg("");
      if (state.accountType === "pharmacist") {
        localStorage.setItem("pharmacist", JSON.stringify(data._id));
        window.location.href = "/pharmacistProfile";
      } else {
        window.location.href = "/patientfilehome";
      }
      // navigate("/patientfilehome");
    } catch (error) {
      console.log({ error });
      if (error.response && error.response.data) {
        setSuccesMsg("");
        setErrorMsg(error.response.data);
        console.log("e", error.response.data);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Form onSubmit={handleOnSubmit} className="register-form">
          <h2>Doctor/Pharmacist Login</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <Form.Select
            className="account-type"
            aria-label="Select Account Type"
            name="accountType"
            value={state.accountType}
            onChange={handleOnChange}
          >
            <option value="">Select Account Type</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={state.email}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={state.password}
              onChange={handleOnChange}
            />
          </Form.Group>
          <p>
            Don't have an account? <Link to="/adminregister">Create One</Link>
          </p>
          <Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
