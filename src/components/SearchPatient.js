import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BASE_API_URL } from "../utils/constants";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchPatient = () => {
  const [patientFiles, setPatientFiles] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const [otcSupplement, setOtcSupplement] = useState([]);
  useEffect(() => {
    const getPatientInfo = async () => {
      try {
        const patientId = JSON.parse(localStorage.getItem("patient")) || "";
        if (patientId) {
          const { data } = await axios.get(`${BASE_API_URL}/file/${patientId}`);

          console.log({ data });
          const { patientFiles, patient } = data;
          setPatientFiles(patientFiles);
          setPatientInfo(patient);
          setAvailableDates(patientFiles.map((file) => file.createdAt));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPatientInfo();
  }, []);

  const handleDateChange = async (event) => {
    const { value } = event.target;
    setSelectedDate(value);
    setSelectedFile(
      patientFiles.find((file) => file.createdAt === value) || {}
    );

    try {
      const patientId = JSON.parse(localStorage.getItem("patient")) || "";
      const { data } = await axios.get(
        `${BASE_API_URL}/otc/${patientId}/${value}`
      );
      setOtcSupplement(data.map((item) => item.otcSupplement));
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  const { firstName, lastName, dateOfBirth, address, phoneNumber, gender } =
    patientInfo;

  const {
    treatmentPlan,
    conditionDescription,
    physicalTreatment,
    allergyReactionsMedicines,
  } = selectedFile;

  const isDateSelected = Object.keys(selectedFile).length > 0;
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="patient-profile">
          <Form.Group className="mb-3 date-selector" controlId="selectedDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Select
              aria-label="Select Date"
              name="selectedDate"
              value={selectedDate}
              onChange={handleDateChange}
            >
              <option value="">Select Date</option>
              {availableDates &&
                availableDates.map((date, index) => (
                  <option value={date} key={index}>
                    {new Date(date).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          {isDateSelected && (
            <div>
              <Link to="/addPatientOtc" state={{ selectedDate }}>
                Add Patient OTC Drugs/Supplements
              </Link>
            </div>
          )}
          <div>
            <b>Name: </b>
            {firstName + " " + lastName}
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
          {isDateSelected && (
            <div>
              <Form.Group>
                <Form.Label>
                  <b>Allergy/Reactions Medicines:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="allergyReactionsMedicines"
                  style={{ width: "250px", height: "100px" }}
                  value={allergyReactionsMedicines || "Not Available"}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Threatment Plans:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="treatmentPlan"
                  style={{ width: "250px", height: "100px" }}
                  value={treatmentPlan || "Not Available"}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Physical Treatment:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="physicalTreatment"
                  style={{ width: "250px", height: "100px" }}
                  value={physicalTreatment || "Not Available"}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Condition Description:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="conditionDescription"
                  style={{ width: "250px", height: "100px" }}
                  value={conditionDescription || "Not Available"}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>OTC Drugs/Supplements:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="conditionDescription"
                  style={{ width: "250px", height: "100px" }}
                  value={otcSupplement.join(", ") || "Not Available"}
                  disabled={true}
                />
              </Form.Group>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPatient;
