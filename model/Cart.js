const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    variationId: String,
    quantity: String,
    // 
  },
  {timestamps:true}
  );
  
  module.exports = mongoose.model("cart", cartSchema);
