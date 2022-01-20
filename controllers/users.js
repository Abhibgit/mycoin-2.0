const User = require("../models/user.js");
const jwt = require("jsonwebtoken"); // import the jwt library
const bcrypt = require("bcrypt"); // import bcrypt

const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
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
    res.json(token);
    console.log("user created", user);
  } catch (err) {
    console.log("user creation error", err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error();

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}
//npm install nodemailer
function sendNotification(req, res) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  console.log(transporter.transporter.options.auth.user);
  let subject = req.body.subject;
  let message = req.body.message;
  let coin = req.body.coin;
  let coinPrice = req.body.price;
  //Have to work on this later after Justin is done populating props
  if (subject != "Email Confirmation") {
    subject = `Your ${coin} price is ${coinPrice}`;
    message = `Give us your money`;
  }
  let mailOptions = {
    from: transporter.transporter.options.auth.user,
    to: req.body.email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
