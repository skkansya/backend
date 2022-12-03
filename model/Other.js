const mongoose = require("mongoose");

const otherSchema= new mongoose.Schema({
  title:String,
  image:String,
  background:String,
  id: String,
  heading: String,
  detail: String,
  button: String,
  linkw:String,
  linkb: String,
  array: Array
   },{ timestamps: true })
  module.exports = mongoose.model("other", otherSchema);