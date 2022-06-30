const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    clinic: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.methods.toJSON = function () {
  const doctor = this;
  const { _id, firstName, lastName } = doctor.toObject();

  return {
    _id,
    firstName,
    lastName,
  };
};

module.exports = mongoose.model("Doctor", doctorSchema);
