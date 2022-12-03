
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId,ref: "user" },
    firmName: String,
    addresss: [{ type: mongoose.Types.ObjectId, ref: "address" }],
    gstNo: String,
    accountNo: Number,
    ifscCode: String,
    accountType: String,
    balance: {type: Number, default:0},
    quotations: [{ type: mongoose.Types.ObjectId, ref: "quotation" }],
  purchaseInvioces: [{ type: mongoose.Types.ObjectId, ref: "purchaseInvioce" }],
  })

  module.exports = mongoose.model("supplier", supplierSchema);
