const express = require("express");
const Prescription = require("../models/prescription");
const prescriptions = require("./prescriptions");

const Router = express.Router();

Router.get("/addPrescription", async (req, res) => {
  try {
    for (let i = 0; i < prescriptions.length; i++) {
      const prescription = new Prescription(prescriptions[i]);
      await prescription.save();
    }
    res.send("Data successfully added");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while adding data");
  }
});

module.exports = Router;
