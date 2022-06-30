const express = require("express");
const Token = require("../models/token");
const Router = express.Router();

Router.post("/saveToken", async (req, res) => {
  try {
    const token = new Token(req.body);
    await token.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while saving otken.");
  }
});

module.exports = Router;
