import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, makeLogout } = useContext(LoginContext);
  console.log({ sidebar: isLoggedIn }, { location });
  let accountType = "";
  try {
    accountType = JSON.parse(localStorage.getItem("accountType"));
  } catch (error) {}

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("doctor");
      localStorage.removeItem("patient");
      //  const accountType = JSON.parse(localStorage.getItem("accountType"));
      console.log({ navigate });
      localStorage.removeItem("accountType");
      localStorage.removeItem("patientName");
      localStorage.removeItem("pharmacist");
      makeLogout();
      window.location.href = "/";
      //navigate(accountType === "patient" ? "/login" : "/adminlogin");
    } catch (error) {
      console.log({ error });
    }
  };
  const isPatientLoggedIn = isLoggedIn && accountType === "patient";
  const isPharmacistLoggedIn = isLoggedIn && accountType === "pharmacist";
  const isDoctorLoggedIn = isLoggedIn && accountType === "doctor";
  console.log(
    { isPatientLoggedIn },
    { isLoggedIn },
    { accountType: accountType === "patient" }
  );
  return (
    <ul>
      {isPharmacistLoggedIn && (
        <li>
          <Link to="/pharmacistProfile">Pharmacist Profile</Link>
        </li>
      )}
      {isPatientLoggedIn ? (
        <li>
          <Link to="/patientProfile">Profile</Link>
        </li>
      ) : (
        !isLoggedIn && (
          <>
            <li>
              <Link to="/login">Patient Login</Link>
            </li>
            <li>
              <Link to="/adminlogin">Admin Login</Link>
            </li>
          </>
        )
      )}
      {isLoggedIn && (
        <>
          <li>
            <Link to="/prescriptions">Userfile and Prescription</Link>
          </li>
          <li>
            <Link to="/graph">Graph</Link>
          </li>
        </>
      )}
      {isLoggedIn && !isPatientLoggedIn && (
        <li>
          <Link to="/editPrescription">Edit Prescription</Link>
        </li>
      )}
      {isLoggedIn !== null && !isDoctorLoggedIn && (
        <li>
          <Link to="/createToken">Token</Link>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Link to={location?.pathname || "/"} onClick={handleLogout}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
