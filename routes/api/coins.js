const express = require("express");
const router = express.Router();
const coinCtrl = require("../../controllers/coins");

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post("/", coinCtrl.create);

module.exports = router;
