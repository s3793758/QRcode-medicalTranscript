const express = require("express");
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Prescription = require("../models/prescription");
const Router = express.Router();

Router.get("/prescriptions", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({});
    return res.send(prescriptions);
  } catch (error) {
    res.status(400).send("Error while getting list of prescriptions");
  }
});

Router.get("/prescription/:patientId", async (req, res) => {
  try {
    let prescriptions = await Prescription.find({
      patient: req.params.patientId,
    });
    prescriptions = await Promise.all(
      prescriptions.map(async (prescription) => {
        const {
          patient,
          doctor,
          medicationName,
          dosages,
          dosageUnit,
          numberOfPills,
          createdAt,
          prescriptionStatus,
        } = prescription;
        // console.log(prescription);
        const [patientName] = await Patient.find({ _id: prescription.patient });
        const [doctorName] = await Doctor.find({ _id: prescription.doctor });
        return {
          patient,
          doctor,
          medicationName,
          dosages,
          dosageUnit,
          numberOfPills,
          createdAt,
          patientName: patientName.firstName + "" + patientName.lastName,
          doctorName: doctorName.firstName + "" + doctorName.lastName,
          prescriptionStatus,
        };
      })
    );
    res.send(prescriptions);
  } catch (error) {
    res.status(400).send("Error while getting patient prescription");
  }
});

Router.post("/updateprescription/:patientId", async (req, res) => {
  try {
    const { selectedDate } = req.body;
    const [prescription] = await Prescription.find({
      patient: req.params.patientId,
      createdAt: selectedDate,
    });
    console.log(prescription);
    if (!prescription) {
      return res.status(404).send("No presciption found");
    }
    prescription.prescriptionStatus = "Dispatched";
    prescription.dispenseDate = new Date().getTime();
    await prescription.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while updating prescription status");
  }
});

Router.post("/prescriptions", async (req, res) => {
  try {
    console.log({ body: req.body });
    const prescription = new Prescription(req.body);
    await prescription.save();
    console.log({ prescription });
    res.send();
  } catch (error) {
    res.status(400).send("Error while adding a prescription");
  }
});

Router.post("/prescription/:prescriptionId", async (req, res) => {
  try {
    console.log({ body: req.body });
    const { medicationName, dosages, dosageUnit, numberOfPills } = req.body;
    const id = req.params.prescriptionId;
    /* const prescription = await Prescription.find({
      _id: id,
    });*/
    const updated = await Prescription.findByIdAndUpdate(
      id,
      {
        medicationName,
        dosages,
        dosageUnit,
        numberOfPills,
      },
      { new: true }
    );
    console.log({ updated });
    return res.send(updated);
  } catch (error) {
    res.status(400).send("Error while editing a prescription");
  }
});

Router.get("/prescriptions/:patientId/:doctorId", async (req, res) => {
  try {
    console.log({ body: req.body });
    const { patientId, doctorId } = req.params;
    const prescriptions = await Prescription.find({
      patient: patientId,
      doctor: doctorId,
    });
    console.log({ patientId, doctorId }, { prescriptions });
    res.send(prescriptions);
  } catch (error) {
    res.status(400).send("Error while getting prescriptions for the patient");
  }
});

module.exports = Router;
