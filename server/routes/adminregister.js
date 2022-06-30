const express = require("express");
const bcrypt = require("bcryptjs");
const Pharmacist = require("../models/pharmacist");
const Doctor = require("../models/doctor");
const Router = express.Router();

Router.post("/adminregister", async (req, res) => {
  console.log("body", req.body);
  try {
    const { accountType, email, password } = req.body;
    if (accountType === "doctor") {
      const isDoctorExists = await Doctor.findOne({ email });
      console.log({ isDoctorExists });
      if (isDoctorExists) {
        return res
          .status(400)
          .send("Doctor with the provided email already exist.");
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const doctor = new Doctor({
        ...req.body,
        password: hashedPassword,
      });
      await doctor.save();
      res.status(201).send();
    } else if (accountType === "pharmacist") {
      const isPharmacist = await Pharmacist.findOne({ email });
      console.log({ isPharmacist });
      if (isPharmacist) {
        return res
          .status(400)
          .send("Pharmacist with the provided email already exist.");
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const pharmacist = new Pharmacist({
        ...req.body,
        password: hashedPassword,
      });
      await pharmacist.save();
      res.status(201).send();
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send();
  }
});

module.exports = Router;
