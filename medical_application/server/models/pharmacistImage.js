const mongoose = require("mongoose");

const PharmacistImageSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },
  prescriptionDate: {
    type: String,
    required: true,
  },
  prescriptionImage: {
    type: String,
    required: true,
  },
});

const PharmacistImage = mongoose.model(
  "PharmacistImage",
  PharmacistImageSchema
);

module.exports = PharmacistImage;
