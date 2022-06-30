const express = require("express");
const Admin = require("../models/admin");
const Router = express.Router();

Router.post("/register", async (req, res) => {
  try {
    console.log("body", req.body);
    const isAdminExists = await Admin.findOne({ email: req.body.email });
    console.log({ isAdminExists });
    if (isAdminExists) {
      return res
        .status(400)
        .send("Patient with the provided email already exist.");
    }
    const admin = new Admin(req.body);
    await admin.save();
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

Router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log({ admin });
    if (admin) {
      return res.send("Login successful");
    } else {
      return res.status(400).send("Authentication failed.");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

module.exports = Router;
