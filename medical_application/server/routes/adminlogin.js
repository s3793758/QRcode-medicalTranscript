const express = require("express");
const bcrypt = require("bcryptjs");
const Pharmacist = require("../models/pharmacist");
const Doctor = require("../models/doctor");
const Router = express.Router();

Router.post("/adminlogin", async (req, res) => {
  const { accountType, email, password } = req.body;
  try {
    if (accountType === "doctor") {
      const doctor = await Doctor.findOne({ email });
      console.log({ doctor });

      if (!doctor) {
        return res.status(400).send("Authentication failed.");
      }

      const isFound = await bcrypt.compare(password, doctor.password);
      console.log({ isFound });
      if (isFound) {
        const { firstName, lastName, clinic, hospital } = doctor;
        return res.send({ firstName, lastName, clinic, hospital });
      } else {
        return res.status(400).send("Authentication failed.");
      }
    } else if (accountType === "pharmacist") {
      const pharmacist = await Pharmacist.findOne({ email });
      console.log({ pharmacist });

      if (!pharmacist) {
        return res.status(400).send("Authentication failed.");
      }

      console.log({ pharmacist });
      const isFound = await bcrypt.compare(password, pharmacist.password);
      console.log({ isFound });
      if (isFound) {
        return res.send({_id: pharmacist._id});
      } else {
        return res.status(400).send("Authentication failed.");
      }
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send();
  }
});

module.exports = Router;
