import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import App from "../App";
import AddContradiction from "../components/AddContradiction";
import AddPatientOtc from "../components/AddPatientOtc";
import AddPrescription from "../components/AddPrescription";
import AdminLogin from "../components/AdminLogin";
import AdminRegister from "../components/AdminRegister";
import CreateToken from "../components/CreateToken";
import Login from "../components/Login";
import PatientFile from "../components/PatientFile";
import PatientFileHome from "../components/PatientFileHome";
import PatientProfile from "../components/SearchPatient";
import SearchPatient from "../components/SearchPatient";
import RedirectUser from "../components/RedirectUser";
import Register from "../components/Register";
import SearchFile from "../components/SearchFile";
import LoginContext from "../context/LoginContext";
import PharmacistProfile from "../components/PharmacistProfile";
import Graph from "../components/Graph";
import EditPrescription from "../components/EditPrescription";

const AppRouter = () => {
  let isLoggedIn = false,
    accountType = "";

  try {
    isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    accountType = JSON.parse(localStorage.getItem("accountType"));
    console.log({ isLoggedIn });
  } catch (error) {
    console.log({ error });
  }

  const makeLogout = () => {
    isLoggedIn = false;
  };

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isLoggedIn, makeLogout }}>
        <RedirectUser />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn && accountType === "patient" ? (
                <Navigate to="/patientProfile" />
              ) : (
                <Navigate to="/adminlogin" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/patientfilehome" element={<PatientFileHome />} />
          <Route path="/patientProfile" element={<PatientProfile />} />
          <Route path="/addPatientOtc" element={<AddPatientOtc />} />
          <Route path="/patientfile" element={<PatientFile />} />
          <Route path="/patientfilesearch" element={<SearchFile />} />
          <Route path="/addContradiction" element={<AddContradiction />} />
          <Route path="/prescriptions" element={<PatientFileHome />} />
          <Route path="/addprescription" element={<AddPrescription />} />
          <Route path="/editprescription" element={<EditPrescription />} />
          <Route path="/createToken" element={<CreateToken />} />
          <Route path="/SearchPatient" element={<SearchPatient />} />
          <Route path="/PharmacistProfile" element={<PharmacistProfile />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
