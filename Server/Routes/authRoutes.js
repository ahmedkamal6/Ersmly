const express = require("express");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../mongoDB/models/user.js");

env.config();
const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const name = req.body.name;
    const user = await User.find({ name });
    if (user.length > 0) {
      res.status(400).send();
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        res.status(201).send();
      } catch (error) {
        res.status(500).send();
      }
    }
  } catch (error) {
    res.status(500).send();
  }
});
router.route("/login").post(async (req, res) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    const user = await User.find({ name });
    if (user.length == 0) {
      res.status(404).send("user doesn't exist");
    } else {
      if(await bcrypt.compare(password,user[0].password)){
        res.status(200).send(JSON.stringify(user[0].id))
      }
      else{
        res.status(400).send("wrong password")
      }
    }
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
