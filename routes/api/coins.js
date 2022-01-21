const express = require("express");
const router = express.Router();
const coinsCtrl = require("../../controllers/coins");

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post("/", coinsCtrl.create);

// router.get("/", coinsCtrl.showAll);

module.exports = router;
