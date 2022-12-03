const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  invoiceNo: String,
  productId: String,
  company: String,
  name: String,
  size: String,
  quantity: Number,
  unit: String,
  colour: String,
  hsnCode: String,
  gstRate: Number,
  taxableAmount: Number,
  tax: Number,
  GrossAmount: Number,
  },
  {timestamps:true}
  );

  module.exports = mongoose.model("quotation", quotationSchema);
