const express = require("express");
const cors = require("cors");
require("./db");
const patientRoutes = require("./routes/patient");
const adminRegister = require("./routes/adminregister");
const adminLogin = require("./routes/adminlogin");
const patientFile = require("./routes/patientFile");
const contradiction = require("./routes/contradiction");
const prescription = require("./routes/prescription");
const doctors = require("./routes/doctors");
const token = require("./routes/token");
const patientOtc = require("./routes/patientOtc");
const pharmacist = require("./routes/pharmacist");
const addPrescriptions = require("./utils/addPrescriptions");

const PORT = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(patientRoutes);
app.use(adminRegister);
app.use(adminLogin);
app.use(patientFile);
app.use(contradiction);
app.use(prescription);
app.use(doctors);
app.use(token);
app.use(patientOtc);
app.use(pharmacist);

// from utils

app.use(addPrescriptions);

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
