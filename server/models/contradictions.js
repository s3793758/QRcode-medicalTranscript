const mongoose = require("mongoose");

const ContradictionSchema = new mongoose.Schema(
  {
    scientificMedicationName: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const Contradiction = mongoose.model("Contradiction", ContradictionSchema);

module.exports = Contradiction;
/*
- address of doctor 
- prescribed patient
- scientific name of medication
- medication name
- dosages (mg,ml,etc)
- dosage Unit
- numb of Pill
- date when prescription was given
- expiration time

*/
