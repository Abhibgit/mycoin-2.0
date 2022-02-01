const User = require("../models/user.js");
const jwt = require("jsonwebtoken"); // import the jwt library
const bcrypt = require("bcrypt"); // import bcrypt

const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  edit,
  delete: deleteUser,
  addCoinToUser,
  getUser,
  addParams,
  addNotification,
  deleteWatchlistItem,
  deleteNotification,
};

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
    console.log("user created", user);
  } catch (err) {
    console.log("user creation error", err);
    res.status(400).json(err);
  }
}

async function edit(req, res) {
  try {
    console.log("Updated Received");
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
      { returnDocument: "after" }
    );

    console.log("Updated User", user);
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
    console.log("Updated Complete");
  } catch (err) {
    console.log("user update error", err);
    res.status(400).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    console.log("User Delete Request Received");
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log("user delete error", err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ name: req.body.name });
    // check password. if it's bad throw an error.
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Password incorrect");

    // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.body._id });
    // check password. if it's bad throw an error.
    // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function addCoinToUser(req, res) {
  try {
    console.log(req.body.watchlist, "this is the req.body.name");
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { watchlist: req.body.watchlist },
      },
      { returnDocument: "after" }
    );
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.log("user delete error", err);
    res.status(400).json(err);
  }
}

async function addParams(req, res) {
  console.log(req.body, "this is the body");
  console.log(req.params.id, "this is the params user ID");
  try {
    const coin = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          watchlist: {
            _id: req.body._id,
            name: req.body.name,
            upperLimit: req.body.upperLimit,
            lowerLimit: req.body.lowerLimit,
          },
        },
      },
      { returnDocument: "after" }
    );
    console.log(coin);
    const token = jwt.sign({ user: coin }, process.env.SECRET, {
      expiresIn: "24h",
    });
    console.log(coin, "this is the coin");
    res.status(200).json(token);
  } catch (err) {
    console.log("coin update error", err);
    res.status(400).json(err);
  }
}

async function addNotification(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { notifications: req.body },
      },
      { returnDocument: "after" }
    );
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.log("user delete error", err);
    res.status(400).json(err);
  }
}

async function deleteWatchlistItem(req, res) {
  console.log(req.params, "this is the req.params");
  console.log(req.params.id, "this is the req.params.id");
  console.log(req.body, "this is the req.body");
  try {
    const user = await User.findById(req.params.id);
    const coin = await User.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          watchlist: {
            _id: req.body,
          },
        },
      },
      { returnDocument: "after" }
    );
    console.log(coin, "this is the coin");
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.log("coin update error", err);
    res.status(400).json(err);
  }
}

async function deleteNotification(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const coin = await User.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          notifications: {
            _id: req.body,
          },
        },
      },
      { returnDocument: "after" }
    );
    console.log(coin, "this is the coin");
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.log("coin update error", err);
    res.status(400).json(err);
  }
}
