const mongoose = require("mongoose");

const PrescriptionImageSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  prescriptionDate: {
    type: String,
    required: true,
  },
  prescriptionImage: {
    type: String,
    required: false,
  },
});

const PrescriptionImage = mongoose.model(
  "PrescriptionImage",
  PrescriptionImageSchema
);

module.exports = PrescriptionImage;
