const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    user: String,
    aReview: String,
    product: String,
    rating: Number,
    medias: [{ type: mongoose.Types.ObjectId, ref: 'media'}],
  },
  {timestamps:true}
  );
  
  module.exports = mongoose.model("review", reviewSchema);
  
