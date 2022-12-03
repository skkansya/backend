const mongoose = require("mongoose");

const pinCodeSchema = new mongoose.Schema({
  areaCode: String,
  postOffice: String,
  number: String,
});

module.exports = mongoose.model("pincode", pinCodeSchema);
