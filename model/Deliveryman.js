const mongoose = require("mongoose");

const deliverymanSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  status: { type: String, default: "Active" },
  modelName: String,
  vehicleNumber: String,
  owner: String,
  aadhar: String,
  rcBook: String,
  drivingLicence: String,
  agreement: String,
  consent: String,
  relation: String,
  earnedCash: { type: Number, default: 0 },
  consignments: [{ type: mongoose.Types.ObjectId, ref: "consignment" }],
});

module.exports = mongoose.model("deliveryman", deliverymanSchema);
