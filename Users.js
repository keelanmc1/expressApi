const express = require("express");
const router = express.Router();
const users = require("../model/userSchema");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const foundUser = await users.find();
    res.json(foundUser);
  } catch (err) {
    res.json({ msg: err });
  }
});

// route to find user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await users.findById(userId);
    if (foundUser) res.json(foundUser);
    else res.json({ msg: "User not found" });
  } catch (err) {
    res.json({ msg: err });
  }
});

// register
router.post("/register", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const user = new users({
        name: req.body.name,
        password: hash,
      });

      try {
        const savedUser = await user.save();
        res.json(savedUser);
      } catch (err) {
        res.json({ msg: err });
      }
    });
  });
});

// login route that accepts username and password.
router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const foundUser = await users.findOne({ name });

  if (!foundUser) res.json({ msg: "User not found!" });
  else {
    bcrypt.compare(password, foundUser.password, (err, data) => {
      if (err) throw err;
      if (data) res.status(200).json({ msg: "Logged in" });
      else res.status(401).json({ msg: "Unsuccessful login" });
    });
  }
});

module.exports = router;
