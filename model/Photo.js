const mongoose = require("mongoose");

const photoSchema= new mongoose.Schema({
  title:String,
  image:String,
  marketerId: String,
  imageDoor:String,
  },{ timestamps: true })
  module.exports = mongoose.model("photo", photoSchema);
