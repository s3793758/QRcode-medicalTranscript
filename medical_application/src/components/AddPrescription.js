import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BASE_API_URL } from "../utils/constants";

const defaultState = {
  doctor: "",
  patient: "",
  medicationName: "",
  dosages: "",
  dosageUnit: "",
  numberOfPills: "",
};

const AddPrescription = () => {
  const [state, setState] = useState(defaultState);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/doctors`);
        setDoctors(data);
      } catch (error) {
        console.log(error);
        setDoctors([]);
      }
    };

    getDoctors();
  }, []);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/patients`);
        setPatients(data);
      } catch (error) {
        console.log(error);
        setPatients([]);
      }
    };

    getPatients();
  }, []);

  useEffect(() => {
    if (state.doctor && state.patient) {
      const getPatientPrescriptions = async () => {
        const { data } = await axios.get(
          `${BASE_API_URL}/prescriptions/${state.patient}/${state.doctor}`
        );
        setPatientPrescriptions(data);
        console.log({ data });
      };

      getPatientPrescriptions();
    } else {
      setPatientPrescriptions([]);
    }
  }, [state.doctor, state.patient]);
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
      const result = await axios.post(`${BASE_API_URL}/prescriptions`, {
        ...state,
        numberOfPills: parseInt(state.numberOfPills, 10),
      });
      console.log({ result: result.data });
      setSuccesMsg("Prescription added successfully.");
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
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Form onSubmit={handleOnSubmit} className="register-form">
          <h2>Add Prescription</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <div className="prescription-form-section">
            <div className="first-form">
              <Form.Group className="mb-3" controlId="doctor">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Select
                  aria-label="Select Doctor"
                  name="doctor"
                  value={state.doctor}
                  onChange={handleOnChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors &&
                    doctors.map((doctor) => (
                      <option value={doctor._id} key={doctor._id}>
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="patient">
                <Form.Label>Select Patient</Form.Label>
                <Form.Select
                  aria-label="Select Patient"
                  name="patient"
                  value={state.patient}
                  onChange={handleOnChange}
                >
                  <option value="">Select Patient</option>
                  {patients &&
                    patients.map((patient) => (
                      <option value={patient._id} key={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    ))}
                </Form.Select>
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
            <div className="prescription-details">
              {patientPrescriptions.length > 0 && (
                <h4>Prescriptions for selected patient</h4>
              )}
              <ul className="patient-prescriptions">
                {patientPrescriptions &&
                  patientPrescriptions.map((prescription) => (
                    <li>
                      <div>
                        Date:
                        {new Date(prescription.updatedAt).toLocaleDateString(
                          "en-US"
                        )}
                      </div>
                      <div>Medication: {prescription.medicationName}</div>
                      <div>Dosages: {prescription.dosages}</div>
                      <div>Dosage Unit: {prescription.dosageUnit}</div>
                      <div>Number of Pills: {prescription.numberOfPills}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddPrescription;
