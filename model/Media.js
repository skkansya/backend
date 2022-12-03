const mongoose = require("mongoose");

const mediaSchema= new mongoose.Schema({
  title:String,
  image:String,
  parentId: String,
  marketerId: { type: mongoose.Types.ObjectId,ref: "user" },
  adminId: { type: mongoose.Types.ObjectId,ref: "user", default: "62f0c0eb2204306719230842"},
  },{ timestamps: true })
  module.exports = mongoose.model("media", mediaSchema);
