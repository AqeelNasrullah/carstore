const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.verify = async (req, res, next) => {
  const token = req.headers?.token?.split(" ")[1];
  const data = jwt.verify(token, process.env.JWT_SECRET, {
    algorithm: "HS512",
  });
  if (data.id) {
    await User.findOne({ where: { id: data.id } })
      .then((resp) => {
        req.user = resp;
        next();
      })
      .catch((err) => new Error(err));
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
};
