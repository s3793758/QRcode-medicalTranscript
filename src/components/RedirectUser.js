import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const RedirectUser = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);
  console.log({ redirect: isLoggedIn });
  useEffect(() => {
    if (!isLoggedIn) {
      try {
        const accountType = JSON.parse(localStorage.getItem("accountType"));
        navigate(accountType === "patient" ? "/login" : "/adminlogin");
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoggedIn]);

  return null;
};

export default RedirectUser;
