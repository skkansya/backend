const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    areaCode: String,
    invoiceNo: String,
    userId: { type: mongoose.Types.ObjectId,ref: "user" },
    orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
    addressId: { type: mongoose.Types.ObjectId,ref: "address" },
    payment: String,
    grandTotal: Number,
    totalWeight: Number,
    deliveryDay: {type : String, default: "1"},
    status: {type : String, default: "Pending"}
  },
  { timestamps: true}
);
module.exports = mongoose.model("invoice", invoiceSchema);
