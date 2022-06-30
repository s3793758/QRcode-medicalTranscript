import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

const defaultState = {
  scientificMedicationName: "",
  medicationName: "",
  dosages: "",
  dosageUnit: "",
  numberOfPills: "",
};
const AddContradiction = () => {
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
    console.log({ state });
    const allFieldsEntered = Object.keys(state).every(
      (key) => state[key].trim() !== ""
    );
    if (!allFieldsEntered) {
      setErrorMsg("Please enter all the field values");
      return;
    }
    try {
      console.log({ state });
      const result = await axios.post(`${BASE_API_URL}/contradictions`, {
        ...state,
        numberOfPills: parseInt(state.numberOfPills, 10),
      });
      console.log({ result: result.data });
      setSuccesMsg("Contradiction added successfully.");
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
          <h2>Add Contradiction</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <div className="first-form">
            <Form.Group className="mb-3" controlId="scientificMedicationName">
              <Form.Label>Scientific Medication Name</Form.Label>
              <Form.Control
                type="scientificMedicationName"
                placeholder="Enter scientific Medication Name"
                name="scientificMedicationName"
                value={state.scientificMedicationName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="medicationName">
              <Form.Label>Medication Name</Form.Label>
              <Form.Control
                type="medicationName"
                placeholder="Enter medicationName"
                name="medicationName"
                value={state.medicationName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dosageUnit">
              <Form.Label>Select Dosage Unit</Form.Label>
              <Form.Select
                aria-label="Select dosageUnit"
                name="dosageUnit"
                value={state.dosageUnit}
                onChange={handleOnChange}
              >
                <option value="">Select Dosage Unit</option>
                <option value="mg">Mg</option>
                <option value="ml">Ml</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dosages">
              <Form.Label>Enter Dosages Count</Form.Label>
              <Form.Control
                type="dosages"
                placeholder="Enter dosages"
                name="dosages"
                value={state.dosages}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="numberOfPills">
              <Form.Label>Number of pills</Form.Label>
              <Form.Control
                type="numberOfPills"
                placeholder="Enter numberOfPills"
                name="numberOfPills"
                value={state.numberOfPills}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddContradiction;
