const coinModel = require("../models/coin.js");
const UserModel = require("../models/user");

module.exports = {
  create,
  //   showAll
};

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    const coin = await new coinModel({ name: req.body.name });
    coin.save();
    const user = await UserModel.findById(req.body.user);
    user.watchlist.push(coin._id);
    user.save();
    console.log(user);
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.json(err);
  }
}

// async function showAll(req, res) {

//   }
