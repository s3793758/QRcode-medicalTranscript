import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

const defaultState = {
  email: "",
  password: "",
};
const Login = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/patientProfile" />;
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
      const { data } = await axios.post(`${BASE_API_URL}/login`, {
        ...state,
      });
      console.log({ data });
      localStorage.setItem("patient", JSON.stringify(data._id));
      localStorage.setItem(
        "patientName",
        JSON.stringify(data.firstName + " " + data.lastName)
      );
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("accountType", JSON.stringify("patient"));
      window.location.href = "/patientProfile";
      //navigate("/patientProfile");
      setSuccesMsg("Login successful");
      setErrorMsg("");
    } catch (error) {
      console.log({ error });
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
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
          <h2>Patient Login</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
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
            Don't have an account? <Link to="/register">Create One</Link>
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

export default Login;
