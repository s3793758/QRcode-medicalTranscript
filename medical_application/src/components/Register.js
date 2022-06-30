import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

const defaultState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  phoneNumber: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

    if (!state.phoneNumber.match(/^\d{10}$/)) {
      setErrorMsg("Please enter valid 10 digit phone number.");
      return;
    }
    try {
      console.log({ state });
      const result = await axios.post(`${BASE_API_URL}/register`, {
        ...state,
      });
      console.log({ result: result.data });
      setSuccesMsg("Patient registered successfully.");
      setErrorMsg("");
      setTimeout(() => {
        setSuccesMsg("");
      }, 3000);
      setState(defaultState);
    } catch (error) {
      console.log({ error });
      if (error.response && error.response.data) {
        setSuccesMsg("");
        setErrorMsg(error.response.data);
        console.log("e", error.response.data);
      }
    }
  };

  const handleNext = (form) => {
    const allForms = document.querySelectorAll(
      ".first-form, .second-form, .third-form"
    );
    allForms.forEach((form) => {
      form.classList.add("hide");
    });

    const selector = document.querySelector("." + form);
    selector.classList.add("show");
    selector.classList.remove("hide");
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Form onSubmit={handleOnSubmit} className="register-form">
          <h2>Patient Registration</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <div className="first-form">
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
            <Form.Group>
              <div>
                If you have an account <Link to="/login">Click this</Link>
              </div>
              <Button
                variant="secondary"
                type="button"
                className="login-btn"
                onClick={() => handleNext("second-form")}
              >
                Next
              </Button>
            </Form.Group>
          </div>
          <div className="second-form hide">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter First Name"
                name="firstName"
                value={state.firstName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                value={state.lastName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Gender</Form.Label>
              <Form.Select
                aria-label="Select Gender"
                name="gender"
                value={state.gender}
                onChange={handleOnChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="navigation-buttons">
              <div>
                If you have an account <Link to="/login">Click this</Link>
              </div>
              <Button
                variant="secondary"
                type="button"
                onClick={() => handleNext("first-form")}
              >
                Back
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="login-btn"
                onClick={() => handleNext("third-form")}
              >
                Next
              </Button>
            </Form.Group>
          </div>
          <div className="third-form hide">
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of birth(dd/mm/yyyy)</Form.Label>
              <Form.Control
                type="dateOfBirth"
                placeholder="Enter Last Name"
                name="dateOfBirth"
                value={state.dateOfBirth}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                placeholder="Enter address"
                name="address"
                value={state.address}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>phone number</Form.Label>
              <Form.Control
                type="phoneNumber"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="navigation-buttons">
              <div>
                If you have an account <Link to="/login">Click this</Link>
              </div>
              <Button
                variant="secondary"
                type="button"
                className="login-btn"
                onClick={() => handleNext("second-form")}
              >
                Back
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
