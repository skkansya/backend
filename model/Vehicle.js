const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  areaCode:String,
  modelName: String,
  wheels: Number,
  fuel: String,
  capacity: String,
  registrationNo: String,
  chassisNo: String,
  engineNo: String,
  regValidity: Date,
  rcBook: String,
});

module.exports = mongoose.model("vehicle", vehicleSchema);
