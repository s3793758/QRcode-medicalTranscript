const express = require("express");
const cloudinary = require("../config");
const PharmacistImage = require("../models/pharmacistImage");
const Pharmacist = require("../models/pharmacist");
const Router = express.Router();

Router.get("/pharmacist/:pharmacistId", async (req, res) => {
  try {
    const pharmacist = await Pharmacist.find({
      _id: req.params.pharmacistId,
    });
    console.log({ pharmacist });
    res.send(pharmacist);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting pharmacist details");
  }
});

Router.post("/pharmacist/uploadImage", async (req, res) => {
  try {
    const { image, patient, pharmacist, prescriptionDate } = req.body;
    //prescriptionImage
    const uploadedFile = await cloudinary.uploader.upload(image, {
      folder: "prescriptions/images",
    });
    const imageUrl = uploadedFile.secure_url;

    const pharmacistImage = new PharmacistImage({
      patient,
      pharmacist,
      prescriptionDate,
      prescriptionImage: imageUrl,
    });
    const result = await pharmacistImage.save();
    console.log({ result });
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while uploading prescription");
  }
});

module.exports = Router;
