const mongoose = require("mongoose");
const TokenSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
