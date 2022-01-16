const coinModel = require("../models/coin.js");

module.exports = {
  create,
};

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    await coinModel.create({ name: req.body.name });
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json("ok. Coin added to DB!");
  } catch (err) {
    res.json(err);
  }
}
