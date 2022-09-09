const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const authValidator = require("../validators/auth");
const authenticate = require("../middlewares/authenticate");

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.post("/create", authValidator.createUser, async (req, res) => {
  await User.findOne({ where: { email: req.body.email } })
    .then(async (resp) => {
      if (resp) {
        res
          .status(200)
          .json({ message: "Email already associated with a user." });
      } else {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        return await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
      }
    })
    .then((resp) => {
      if (resp) {
        res.status(200).json(resp);
      }
    })
    .catch((err) => new Error(err));
});

router.post("/login", authValidator.login, async (req, res) => {
  await User.findOne({ where: { email: req.body.email } })
    .then(async (resp) => {
      if (resp) {
        const verified = await bcrypt.compare(req.body.password, resp.password);
        if (verified) {
          req.session.userId = resp.id;
          res.status(200).json({ message: "LoggedIn successfully." });
        } else {
          res.status(401).json({ message: "Password is incorrect." });
        }
      } else {
        res.status(401).json({ message: "User not registered." });
      }
    })
    .catch((err) => new Error(err));
});

router.get("/user", authenticate.verify, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", authenticate.verify, (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "LoggedOut successfully." });
});

module.exports = router;
