
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  laneVillage: String,
  landmark: String,
  state: String,
  district: String,
  pinCode: String,
  longitude: Number,
  latitude: Number,
image: String,
imageDoor: String
});

module.exports = mongoose.model("address", addressSchema);
