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

const coinSchema = new Schema(
  {
    name: String,
    price: Number,
    comment: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coin", coinSchema);
