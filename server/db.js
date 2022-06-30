const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("database connected successfully.");
  })
  .catch(() => {
    console.log("Error connecting to the database");
  });
