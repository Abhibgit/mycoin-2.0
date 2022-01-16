const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post("/", usersCtrl.create);

module.exports = router;
