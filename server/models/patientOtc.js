const mongoose = require("mongoose");

const OTCSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    otcSupplement: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const PatientOTC = mongoose.model("PatientOTC", OTCSchema);

module.exports = PatientOTC;
