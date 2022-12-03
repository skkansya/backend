const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: String,
    company: String,
    name: String,
    hsnCode: String,
    gstRate: Number,
    detail: String,
    rating: Number,
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: "62f0c0eb2204306719230842",
    },
    marketerId: { type: mongoose.Types.ObjectId, ref: "user" },
    variations: [{ type: mongoose.Types.ObjectId, ref: "variation" }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
