import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { exportComponentAsPNG } from "react-component-export-image";
import QRCode from "react-qr-code";
import { BASE_API_URL } from "../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";
const CreateToken = () => {
  const [patient, setPatient] = useState("");
  const [loggedInPatientName, setLoggedInPatientName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [patients, setPatients] = useState([]);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [patientPrescription, setPatientPrescription] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(false);
  const [isQRDownloaded, setIsQRDownloaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [accountType, setAccountType] = useState("");
  const [marked, setMarked] = useState(false);
  const qrCodeRef = useRef();

  useEffect(() => {
    try {
      const accType = JSON.parse(localStorage.getItem("accountType"));
      const patientId = JSON.parse(localStorage.getItem("patient"));
      if (accType === "patient") {
        setPatient(patientId);
        setLoggedInPatientName(JSON.parse(localStorage.getItem("patientName")));
        getPrescription(patientId);
      }
      setAccountType(accType || "");
    } catch (error) {
      setAccountType("");
      setLoggedInPatientName("");
    }
  }, []);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/patients`);
        setPatients(data);
        setErrorMsg("");
      } catch (error) {
        console.log(error);
        setPatients([]);
        setErrorMsg("Error while getting list of patients");
      }
    };

    getPatients();
  }, []);

  async function getPrescription(patientId) {
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/prescription/${patientId}`
      );
      console.log({ dt: data });
      setPatientPrescriptions(data);
      setAvailableDates(data.map((item) => item.createdAt));
      setErrorMsg("");
    } catch (error) {
      console.log(error);
      setPatientPrescription("");
      setErrorMsg("Error while getting prescription");
    }
  }

  const handleOnChange = async (event) => {
    const patient = event.target.value;
    setPatient(patient);
    getPrescription(patient);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    const selectedPrescription = patientPrescriptions.find(
      (patient) => patient.createdAt === date
    );
    console.log({ selectedPrescription });
    const {
      medicationName,
      dosages,
      dosageUnit,
      numberOfPills,
      patientName,
      doctorName,
      prescriptionStatus,
    } = selectedPrescription || {};
    const prescription = `
      Medication Name: ${medicationName}
      Dosages: ${dosages}
      Dosage Unit: ${dosageUnit}
      Number Of Pills: ${numberOfPills}
      Patient: ${patientName}
      Doctor: ${doctorName}
    `;
    console.log({ prescription }, { prescriptionStatus });
    setMarked(prescriptionStatus === "Dispatched");
    setPatientPrescription(prescription);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageToUpload(reader.result);
      console.log("file", reader.result);
    };
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (accountType === "patient") {
        const { data } = await axios.post(
          `${BASE_API_URL}/uploadPrescription`,
          { image: imageToUpload, patient, prescriptionDate: selectedDate },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log({ data });
        setSuccessMsg("QR Code image uploaded successfully.");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      } else if (accountType === "pharmacist") {
        const pharmacistId = JSON.parse(localStorage.getItem("pharmacist"));
        const { data } = await axios.post(
          `${BASE_API_URL}/pharmacist/uploadImage`,
          {
            image: imageToUpload,
            patient,
            pharmacist: pharmacistId,
            prescriptionDate: selectedDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log({ data });
        setSuccessMsg("QR Code image uploaded successfully.");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Error while uploading QR Code");
    }
  };

  console.log({ patientPrescription }, { pp: patient });

  const downloadQRCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      exportComponentAsPNG(qrCodeRef, "cover")
        .then(() => {
          setIsLoading(false);
          setIsQRDownloaded(true);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 0);
  };

  console.log({ loggedInPatientName });

  const handleMarkDispatch = async () => {
    try {
      await axios.post(`${BASE_API_URL}/updateprescription/${patient}`, {
        selectedDate,
      });
      setErrorMsg("");
      setSuccessMsg("Prescription successfully marked as dispatched.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data);
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
        <div className="token-form">
          {accountType === "pharmacist" ? (
            <Form.Group className="mb-3" controlId="patient">
              <Form.Label>Select Patient</Form.Label>
              <Form.Select
                aria-label="Select Patient"
                name="patient"
                value={patient}
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
          ) : (
            <div>
              <b>Patient Name:</b> {loggedInPatientName}
            </div>
          )}
          <Form.Group className="mb-3" controlId="selectedDate">
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
          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {isLoading && <p>Downloading...</p>}
          {patientPrescription && (
            <>
              <Button
                className="primary"
                onClick={downloadQRCode}
                disabled={isLoading}
              >
                Download
              </Button>
              <div className="qr-code-container" ref={qrCodeRef}>
                <QRCode
                  value={patientPrescription}
                  id="qrcode"
                  className="qr-code"
                />
              </div>
              <Button
                variant="secondary"
                disabled={marked}
                onClick={handleMarkDispatch}
              >
                {marked ? "Already marked as dispatched" : "Mark as dispatched"}
              </Button>
              {isQRDownloaded && (
                <>
                  <h3>Upload QR Code</h3>
                  <div className="upload-qr-section">
                    <form onSubmit={handleUpload}>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                      <Form.Group className="mt-3">
                        <Button type="submit">Upload</Button>
                      </Form.Group>
                    </form>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
