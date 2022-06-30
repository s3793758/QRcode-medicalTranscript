import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PatientFileHome = (props) => {
  const navigate = useNavigate();
  const handleCreateNewFile = () => {
    navigate("/patientfile");
  };

  const handleSearchFile = () => {
    navigate("/patientfilesearch");
  };

  const handleAddPrescription = () => {
    navigate("/addprescription");
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="patient-file">
          <div onClick={handleCreateNewFile}>Create a new file</div>
          <div onClick={handleSearchFile}>Search and edit existing files</div>
          <div onClick={handleAddPrescription}>Add Prescription</div>
        </div>
      </div>
    </div>
  );
};

export default PatientFileHome;
