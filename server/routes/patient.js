const express = require("express");
const cloudinary = require("../config");
const bcrypt = require("bcryptjs");
const Patient = require("../models/patient");
const PrescriptionImage = require("../models/prescriptionImage");
const Router = express.Router();

Router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.send(patients);
  } catch (error) {
    res.status(400).send("Error while getting list of patients.");
  }
});

Router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body", req.body);
    const isPatientExists = await Patient.findOne({ email });
    console.log({ isPatientExists });
    if (isPatientExists) {
      return res
        .status(400)
        .send("Patient with the provided email already exist.");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const patient = new Patient({
      ...req.body,
      password: hashedPassword,
    });
    await patient.save();
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

Router.post("/uploadPrescription", async (req, res) => {
  try {
    const { image, patient, prescriptionDate } = req.body;
    console.log({ patient }, { prescriptionDate });
    //prescriptionImage
    const uploadedFile = await cloudinary.uploader.upload(image, {
      folder: "prescriptions/images",
    });
    const imageUrl = uploadedFile.secure_url;

    const prescription = new PrescriptionImage({
      patient,
      prescriptionDate,
      prescriptionImage: imageUrl,
    });
    const result = await prescription.save();
    console.log({ result });
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while uploading prescription");
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({
      email,
    });

    const isFound = await bcrypt.compare(password, patient.password);
    console.log({ isFound });
    if (isFound) {
      return res.send(patient);
    } else {
      return res.status(400).send("Authentication failed.");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

module.exports = Router;
