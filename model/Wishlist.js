const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
   variationId: String,
   quantity: Number,
  });
  
  module.exports = mongoose.model("wishlist", wishlistSchema);
