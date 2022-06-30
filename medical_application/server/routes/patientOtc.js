const express = require("express");
const PatientOTC = require("../models/patientOtc");
const Router = express.Router();

Router.get("/otc/:patientId/:selectedDate", async (req, res) => {
  try {
    const { patientId, selectedDate } = req.params;
    const otc = await PatientOTC.find({
      patient: patientId,
      selectedDate: selectedDate,
    });
    console.log({ patientId, selectedDate });
    console.log({ otc });
    return res.send(otc);
  } catch (error) {
    res.status(400).send("Error while getting patient OTC");
  }
});

Router.post("/addOtc/:patientId", async (req, res) => {
  try {
    console.log({ body: req.body }, { patientId: req.params.patientId });
    const patient = new PatientOTC({
      patient: req.params.patientId,
      ...req.body,
    });
    await patient.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while adding Patient OTC");
  }
});

module.exports = Router;
