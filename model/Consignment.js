const mongoose = require("mongoose");

const consignmentSchema = new mongoose.Schema(
  {
    areaCode: String,
    deliverymanId: { type: mongoose.Types.ObjectId,ref: "deliveryman" },
    invoices: [{ type: mongoose.Types.ObjectId, ref: "invoice" }],
    vehicleId: String,
    name: String,
    vehicle:String,
    payment: {type : String, default: "left"},
    grandTotal: Number,
    totalWeight: Number,
    meterStart: Number,
    meterRun: Number,
    deliveryDay: {type : String, default: "1"},
    status: {type : String, default: "new delivery"}
  },
  { timestamps: true}
);
module.exports = mongoose.model("consignment", consignmentSchema);