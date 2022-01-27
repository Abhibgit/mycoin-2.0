const coinModel = require("../models/coin.js");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken"); // import the jwt library

module.exports = {
  create,
  //   showAll
};

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    const coin = await coinModel.create({ name: req.body.name });
    console.log(coin);
    const user = await UserModel.findOne({ _id: req.body.user });
    console.log(user, "this is the user");
    user.watchlist.push(coin._id);
    const newUser = await user.save();
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    const token = jwt.sign({ user: newUser }, process.env.SECRET, {
      expiresIn: "24h",
    });
    console.log(token);
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.json(err);
  }
}

// async function showAll(req, res) {

//   }
