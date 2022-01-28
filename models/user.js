const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinSchema = new Schema(
  {
    name: String,
    upperLimit: Number,
    lowerLimit: Number,
    // comment: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const notificationSchema = new Schema(
  {
    message: String,
  },
  {
    timestamps: true,
  }
);
const userSchema = new Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    watchlist: [coinSchema],
    notification: [notificationSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
