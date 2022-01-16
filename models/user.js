const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Coins" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
