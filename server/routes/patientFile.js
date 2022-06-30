const express = require("express");
const PatientFile = require("../models/PatientFile");
const Patient = require("../models/patient");

const Router = express.Router();

Router.get("/file/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patientFiles = await PatientFile.find({ patient: patientId });
    const patient = await Patient.findOne({ _id: patientId });
    console.log({ patientFiles }, { patient });
    /* console.log({ patientFiles });
    for (let i = 0; i < patientFiles.length; i++) {
      console.log({ patient: patientFiles[i] });
      await patientFiles[i].populate("patient").exec();
    }
    // console.log({ patientFiles });*/

    res.send({ patientFiles, patient });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting patient file.");
  }
});

Router.get("/file/patient/:patientName", async (req, res) => {
  try {
    const patientName = req.params.patientName;
    const patientsList = await Patient.find({ firstName: patientName });
    if (patientsList.length === 0) {
      return res.status(400).send("No matching patient found.");
    }
    console.log({ patientsList });
    const patientFiles = await PatientFile.find({
      patient: patientsList[0]._id,
    });
    console.log({ patientFiles });
    res.send(patientFiles);
  } catch (error) {
    res.status(400).send("Error while getting patient file.");
  }
});

Router.post("/addFile", async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const patient = new PatientFile({
      ...req.body,
      patient: body.selectedPatient,
    });
    await patient.save();
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while adding patient file.");
  }
});

module.exports = Router;
