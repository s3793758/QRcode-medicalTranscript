const express = require("express");
const Contradiction = require("../models/contradictions");
const Router = express.Router();

Router.get("/contradictions", async (req, res) => {
  try {
    const contradictions = await Contradiction.find({});
    res.send(contradictions);
  } catch (error) {
    res.status(400).send("Error while getting list of cotradictions");
  }
});

Router.post("/contradictions", async (req, res) => {
  try {
    const body = req.body;
    const contradiction = new Contradiction(req.body);
    await contradiction.save();
    res.status(201).send(contradiction);
    console.log({ body });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while adding contradiction");
  }
});

module.exports = Router;
