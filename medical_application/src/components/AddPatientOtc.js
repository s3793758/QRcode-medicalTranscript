import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BASE_API_URL } from "../utils/constants";
import { Link, useLocation } from "react-router-dom";

const AddPatientOtc = () => {
  const { state } = useLocation();
  const { selectedDate } = state || {};
  console.log({ selectedDate });
  const [otcSupplement, setOtcSupplement] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOnChange = (event) => {
    setOtcSupplement(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log({ otcSupplement });

    if (otcSupplement.trim() !== "") {
      try {
        const patientId = JSON.parse(localStorage.getItem("patient"));
        const { data } = axios.post(`${BASE_API_URL}/addOtc/${patientId}`, {
          otcSupplement,
          selectedDate,
        });
        console.log({ data });
        setSuccessMsg("Patient OTC added successfully.");
        setOtcSupplement("");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
        setErrorMsg("");
      } catch (error) {
        console.log(error);
        setSuccessMsg("");
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
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
        <form onSubmit={handleFormSubmit} className="patient-otc">
          <Link to="/patientProfile">Profile page</Link>
          <h2>Add Patient OTC Drugs/Supplements</h2>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Enter OTC Drugs/Supplement:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTC Drugs/Supplement"
              name="otcSupplement"
              value={otcSupplement}
              onChange={handleOnChange}
              as="textarea"
              style={{ width: "300px", height: "100px" }}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default AddPatientOtc;
