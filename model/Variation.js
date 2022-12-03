const mongoose = require("mongoose");


const variationSchema = new mongoose.Schema({
  productId:{ type: mongoose.Types.ObjectId,ref: "product" },
  size: String,
  colour: String,
  tags: Array,
  model: String,
  flavour: String,
  mrp: Number,
  sp: Number,
  rating: String,
  weight: Number,
  dimension: String,
  thumbnail: String,
  volume: Number,
  marketerId: { type: mongoose.Types.ObjectId,ref: "user",  default:"62f0c0eb2204306719230842" },
  adminId: { type: mongoose.Types.ObjectId,ref: "user" },
  medias: [{ type: mongoose.Types.ObjectId, ref: 'media'}],
  specifications: [{ type: mongoose.Types.ObjectId, ref: 'specification'}],
  stocks: [{ type: mongoose.Types.ObjectId, ref: 'stock'}],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment'}]
},
{timestamps:true}
);
module.exports = mongoose.model("variation", variationSchema);
