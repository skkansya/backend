const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
  marketerId: { type: mongoose.Types.ObjectId,ref: "user" },
  adminId: { type: mongoose.Types.ObjectId,ref: "user",  default:"62f0c0eb2204306719230842" },
  head: String,
  value: String,
},
{timestamps:true}
);

module.exports = mongoose.model("specification", specificationSchema);
