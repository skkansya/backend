const mongoose = require("mongoose");

const backOrderSchema = new mongoose.Schema({
    areaCode: String,
    productId: String,
    company: String,
    name: String,
    quantity: Number,
    size: String,
    colour: String,
    hsnCode: String,
    gstRate: Number,
  },
  {timestamps:true}
  );


module.exports = mongoose.model("backorder", backOrderSchema);
