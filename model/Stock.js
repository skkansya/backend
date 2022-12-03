const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  variationId:{ type: mongoose.Types.ObjectId,ref: "variation" },
  areaCode: String,
  number: Number,
});

module.exports = mongoose.model("stock", stockSchema);
