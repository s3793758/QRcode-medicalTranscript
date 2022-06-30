const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    conditionDescription: {
      type: String,
      required: true,
    },
    physicalCondition: {
      type: String,
      required: true,
    },
    treatmentPlan: {
      type: String,
      required: true,
    },
    allergyReactionsMedicines: {
      type: String,
      required: true,
    },
    medicationTakingRecords: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PatientFile = mongoose.model("PatientFile", PatientSchema);

module.exports = PatientFile;
