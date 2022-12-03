const mongoose = require("mongoose");

const purchaseInvoiceSchema = new mongoose.Schema({
  invoiceNo: String,
  userId: { type: mongoose.Types.ObjectId,ref: "user" },
  quotations: [{ type: mongoose.Types.ObjectId, ref: "quotation" }],
  },
  {timestamps:true}
  );

  module.exports = mongoose.model("purchaseInvoice", purchaseInvoiceSchema);
