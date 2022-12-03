const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  invoiceNo: String,
  areaCode: String,
  variationId: { type: mongoose.Types.ObjectId, ref: "variation" },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  name: String,
  size: String,
  quantity: Number,
  unit: {type : String, default: "poc"},
  hsnCode: String,
  gstRate: Number,
  taxableAmount: Number,
  tax: Number,
  amount: Number,
  },
  );

  module.exports = mongoose.model("order", orderSchema);
