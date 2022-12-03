const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    name: String,
    areaCode: String,
    laptopIpAddress: String,
    desktopIpAddress: String,
    totalcash: {type:Number, default:0},
    addresss: [{ type: mongoose.Types.ObjectId, ref: "address" }],
    marketers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
      
    backorders: [{type: mongoose.Types.ObjectId, ref: "backorder"}],
    deliverymans: [{ type: mongoose.Types.ObjectId, ref: "deliveryman" }],
    vehicles:[{ type: mongoose.Types.ObjectId, ref: "deliveryman" }],
    pinCodes: [{ type: mongoose.Types.ObjectId, ref: "pincode" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("area", areaSchema);
