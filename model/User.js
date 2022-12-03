const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  areaCode: String,
  type: { type: String,  default: "User"},
  sponsor: { type: mongoose.Types.ObjectId,ref: "user" },
  userId: String,
  name: String,
  Gender: String,
  mobileNumber: {type: Number, required: true, unique:true},
  altMobileNumber: Number,
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  aadharNumber: String,
  panNumber: String,
  accountNo: Number,
  ifscCode: String,
  accountType: String,
  readyCash: { type: Number,  default:0 },
  walletCash: { type: Number,  default:0 },
  pointsEarn: { type: Number,  default:0 },
  deviceIpAddress: String,
  addresss: [{ type: mongoose.Types.ObjectId, ref: "address" }],
  carts: [{ type: mongoose.Types.ObjectId, ref: "cart" }],
  wishlists: [{ type: mongoose.Types.ObjectId, ref: "wishlist" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  invoices: [{ type: mongoose.Types.ObjectId, ref: "invoice" }],
  image: String,
  refrences: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  mlm: {
    level: { type: Number,  default:0 },
    id1: { type: mongoose.Types.ObjectId,ref: "user" },
    id2: { type: mongoose.Types.ObjectId,ref: "user" },
    id3: { type: mongoose.Types.ObjectId,ref: "user" },
    id4: { type: mongoose.Types.ObjectId,ref: "user" },
    id5: { type: mongoose.Types.ObjectId,ref: "user" },
    id6: { type: mongoose.Types.ObjectId,ref: "user" },
    id7: { type: mongoose.Types.ObjectId,ref: "user" },
    id8: { type: mongoose.Types.ObjectId,ref: "user" },
  },
 
 
});

module.exports = mongoose.model("users", userSchema);
