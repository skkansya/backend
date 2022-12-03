const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    user: String,
    aComment: String,
    product: String,
    rating: Number
  },
  {timestamps:true}
  );
  
  module.exports = mongoose.model("comment", commentSchema);
  
