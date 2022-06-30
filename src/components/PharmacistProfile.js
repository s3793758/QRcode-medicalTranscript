import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PharmacistProfile = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [pharmacist, setPharmacist] = useState({});
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getPharmacists = async () => {
      try {
        const pharmacistId = JSON.parse(localStorage.getItem("pharmacist"));
        const { data } = await axios.get(
          `${BASE_API_URL}/pharmacist/${pharmacistId}`
        );
        console.log({ pharmacists: data });
        setPharmacist(data[0]);
        setErrorMsg("");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
      }
    };

    const getPatients = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/patients`);
        console.log({ patients: data });
        setPatients(data);
        setErrorMsg("");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
      }
    };

    const getDoctors = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/doctors`);
        console.log({ doctors: data });
        setDoctors(data);
        setErrorMsg("");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
      }
    };

    getPharmacists();
    getDoctors();
    getPatients();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedPatient) {
      const getPrescriptions = async () => {
        try {
          const { data } = await axios.get(
            `${BASE_API_URL}/prescriptions/${selectedPatient}/${selectedDoctor}`
          );
          console.log({ prescriptions: data });
          setPrescriptions(data);
          setSelectedDates(data.map((prescription) => prescription.createdAt));
          setErrorMsg("");
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            setErrorMsg(error.response.data);
          }
        }
      };
      getPrescriptions();
    }
  }, [selectedDoctor, selectedPatient]);

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    if (name === "selectedDoctor") {
      setSelectedDoctor(value);
    } else if (name === "selectedPatient") {
      setSelectedPatient(value);
    } else if (name === "selectedDate") {
      setSelectedDate(value);
      setSelectedPrescription(
        prescriptions.find(
          (prescription) =>
            prescription.doctor === selectedDoctor &&
            prescription.patient === selectedPatient &&
            prescription.createdAt === value
        ) || {}
      );
    }

    try {
      //const {patientId, doctorId} = patients.find()
      /*const { data } = await axios.get(
        `${BASE_API_URL}/prescriptions/${patientId}/${doctorId}`
      );
      console.log({ file: data });
      setPatientInfo(data.patientFiles || []);
      setErrorMsg("");*/
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data);
      }
    }
  };

  const { firstName, lastName, gender, dateOfBirth, address, phoneNumber } =
    pharmacist;

  console.log({ selectedPrescription });
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="pharmacist-profile">
          {errorMsg ? (
            <p className="error-msg">{errorMsg}</p>
          ) : (
            <>
              <div>
                <b>Name: </b>
                {firstName + "" + lastName}
              </div>
              <div>
                <b>Date Of Birth:</b> {dateOfBirth}
              </div>
              <div>
                <b>Gender:</b> {gender}
              </div>
              <div>
                <b>Address:</b>
                {address}
              </div>
              <div>
                <b>Phone Number:</b>
                {phoneNumber}
              </div>
              <hr />
            </>
          )}
          <Form.Group className="mb-3 date-selector" controlId="patient">
            <Form.Label>Select Patient</Form.Label>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            <Form.Select
              aria-label="Select Patient"
              name="selectedPatient"
              value={selectedPatient}
              onChange={handleOnChange}
            >
              <option value="">Select Patient</option>
              {patients &&
                patients.map((patient) => (
                  <option value={patient._id} key={patient._id}>
                    {patient.firstName + " " + patient.lastName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              aria-label="Select Doctor"
              name="selectedDoctor"
              value={selectedDoctor}
              onChange={handleOnChange}
            >
              <option value="">Select Doctor</option>
              {doctors &&
                doctors.map((doctor) => (
                  <option value={doctor._id} key={doctor._id}>
                    {doctor.firstName + " " + doctor.lastName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Select
              aria-label="Select Date"
              name="selectedDate"
              value={selectedDate}
              onChange={handleOnChange}
            >
              <option value="">Select Date</option>
              {selectedDates &&
                selectedDates.map((date, index) => (
                  <option value={date} key={index}>
                    {new Date(date).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          {selectedPrescription && (
            <div className="mt-3">
              {selectedPrescription.medicationName && (
                <Form.Group>
                  <Form.Label>
                    <b>Medication Name: </b>
                  </Form.Label>
                  {selectedPrescription.medicationName}
                </Form.Group>
              )}
              {selectedPrescription.dosageUnit && (
                <Form.Group>
                  <Form.Label>
                    <b>Dosage Unit: </b>
                  </Form.Label>
                  {selectedPrescription.dosageUnit}
                </Form.Group>
              )}
              {selectedPrescription.dosages && (
                <Form.Group>
                  <Form.Label>
                    <b>Dosages: </b>
                  </Form.Label>
                  {selectedPrescription.dosages}
                </Form.Group>
              )}
              {selectedPrescription.numberOfPills && (
                <Form.Group>
                  <Form.Label>
                    <b>Number of pills: </b>
                  </Form.Label>
                  {selectedPrescription.numberOfPills}
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>
                  <b>Prescription Status: </b>
                </Form.Label>
                {selectedPrescription.prescriptionStatus || "Not Dispatched"}
              </Form.Group>
              {selectedPrescription.dispenseDate && (
                <Form.Group>
                  <Form.Label>
                    <b>Dispense Date: </b>
                  </Form.Label>
                  {new Date(
                    +selectedPrescription.dispenseDate
                  ).toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Form.Group>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacistProfile;
