// import the Order Model. I'm calling this OrderModel for clarity, but typically this variable is called Order
const userModel = require("../models/user.js");

module.exports = {
  create,
};

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    await userModel.create({ name: req.body.name });
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json("ok. User added to DB!");
  } catch (err) {
    res.json(err);
  }
}
