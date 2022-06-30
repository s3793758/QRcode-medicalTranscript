const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    medicationName: {
      type: String,
      required: true,
    },
    dosages: {
      type: String,
      required: true,
    },
    dosageUnit: {
      type: String,
      required: true,
    },
    numberOfPills: {
      type: Number,
      required: true,
    },
    prescriptionStatus: {
      type: String,
      required: false,
    },
    dispenseDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = Prescription;
