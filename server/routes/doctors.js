const express = require("express");
const Doctor = require("../models/doctor");

const Router = express.Router();

Router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.send(doctors);
  } catch (error) {
    res.status(400).send("Error while getting list of doctors");
  }
});

Router.get('/doctorVisits', async (req, res) => {
try {
  
} catch (error) {
  
}
});

module.exports = Router;
