const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// Route handler for POSTing a new order.
router.post("/signup", usersCtrl.create);
router.post("/getuser", usersCtrl.getUser);
// POST /api/users/login
router.post("/login", usersCtrl.login);
router.post("/:id/edit", usersCtrl.edit);
router.delete("/:id", usersCtrl.delete);
router.post("/coins", usersCtrl.addCoinToUser);

module.exports = router;
