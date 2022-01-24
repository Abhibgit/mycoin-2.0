const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
