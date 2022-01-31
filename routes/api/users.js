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
router.post("/:id/coins", usersCtrl.addCoinToUser);
router.put("/coins/:id", usersCtrl.addParams);
router.post("/:id/coins/notifications", usersCtrl.addNotification);
router.delete("/coins/:id", usersCtrl.deleteWatchlistItem);


module.exports = router;
