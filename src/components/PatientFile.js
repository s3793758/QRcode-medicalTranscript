import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import PatientMedications from "./PatientMedications";
import Sidebar from "./Sidebar";

const defaultState = {
  conditionDescription: "",
  physicalCondition: "",
  treatmentPlan: "",
  allergyReactionsMedicines: "",
  medicationTakingRecords: "",
};
const PatientFile = () => {
  const [state, setState] = useState(defaultState);
  const [successMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({});
  const [medicationInfo, setMedicationInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      const doctor = JSON.parse(localStorage.getItem("doctor"));
      console.log({ doctor });
      setDoctorInfo(doctor);
    } catch (error) {}
  }, []);

  useEffect(() => {
    axios.get(`${BASE_API_URL}/patients`).then((response) => {
      setPatients(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      axios
        .get(`${BASE_API_URL}/file/${selectedPatient}`)
        .then((res) => {
          console.log(res.data);
          setMedicationInfo(res.data);
        })
        .catch((error) => {
          console.log({ error });
        });
    } else {
      setMedicationInfo([]);
    }
  }, [selectedPatient, refresh]);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

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
    const { medicationTakingRecords, ...fields } = state;
    const allFieldsEntered = Object.keys(fields).every(
      (key) => state[key].trim() !== ""
    );
    if (!allFieldsEntered) {
      setErrorMsg("Please enter all the field values");
      return;
    }
    try {
      console.log({ state });
      const { data } = await axios.post(`${BASE_API_URL}/addFile`, {
        ...state,
        selectedPatient,
      });
      console.log({ data });
      setSuccesMsg("Information successfully added");
      setErrorMsg("");
      setTimeout(() => {
        setSuccesMsg("");
      }, 3000);
      setState(defaultState);
      setRefresh((refresh) => !refresh);
    } catch (error) {
      console.log({ error });
      if (error.response && error.response.data) {
        setSuccesMsg("");
        setErrorMsg(error.response.data);
        console.log("e", error.response.data);
      }
    }
  };
  console.log({ doctorInfo });

  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Form onSubmit={handleOnSubmit} className="register-form">
          <Link to="/patientfilehome">Back</Link>
          {doctorInfo && (
            <>
              <div>
                Doctor Name: {`${doctorInfo.firstName} ${doctorInfo.lastName}`}
              </div>
              <div>Clinic: {doctorInfo.clinic}</div>
              <div>Hospital: {doctorInfo.hospital}</div>
            </>
          )}
          <h2>Add File</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <Form.Group className="mb-3" controlId="conditionDescription">
            <Form.Label>Select Patient</Form.Label>
            <Form.Select
              aria-label="Select Patient "
              name="selectedPatient"
              value={selectedPatient}
              onChange={handlePatientChange}
            >
              <option value="">Select Patient</option>
              {patients &&
                patients.map((patient) => {
                  return (
                    <option value={patient._id} key={patient._id}>
                      {`${patient.firstName} ${patient.lastName}`}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="conditionDescription">
            <Form.Label>Condition Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Condition Description"
              name="conditionDescription"
              value={state.conditionDescription}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="physicalCondition">
            <Form.Label>Physical Treatment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Physical Treatment"
              name="physicalCondition"
              value={state.physicalCondition}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="treatmentPlan">
            <Form.Label> Treatment Plan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Treatment Plan"
              name="treatmentPlan"
              value={state.treatmentPlan}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="allergyReactionsMedicines">
            <Form.Label>Allergy/adverse Reactions Medicines</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Allergy/adverse Reactions Medicines"
              name="allergyReactionsMedicines"
              value={state.allergyReactionsMedicines}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="medicationTakingRecords">
            <Form.Label>Medications Already Taking</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Medications Already Taking"
              name="medicationTakingRecords"
              value={state.medicationTakingRecords}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form.Group>
          {medicationInfo.length > 0 && (
            <PatientMedications patientMedications={medicationInfo} />
          )}
        </Form>
      </div>
    </div>
  );
};

export default PatientFile;
