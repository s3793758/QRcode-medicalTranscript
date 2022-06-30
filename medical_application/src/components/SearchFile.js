import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import PatientMedications from "./PatientMedications";
import Sidebar from "./Sidebar";

const SearchFile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [medicationInfo, setMedicationInfo] = useState([]);

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      axios
        .get(`${BASE_API_URL}/file/patient/${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setMedicationInfo(res.data);
          setErrorMsg("");
        })
        .catch((error) => {
          console.log(error);
          if (error.response?.data) {
            setErrorMsg(error.response.data);
          }
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Form
          onSubmit={handleOnSubmit}
          className="search-file-form"
          style={{ width: "50%" }}
        >
          <h2>Search File</h2>

          <Form.Group controlId="searchTerm">
            <Form.Label>Search File</Form.Label>
            <Form.Control
              type="searchTerm"
              placeholder="Enter patient name to search"
              name="searchTerm"
              value={searchTerm}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form.Group>
          {errorMsg ? (
            <p className="error-msg">{errorMsg}</p>
          ) : (
            medicationInfo.length > 0 && (
              <PatientMedications patientMedications={medicationInfo} />
            )
          )}
        </Form>
      </div>
    </div>
  );
};

export default SearchFile;
