const { User } = require("../models");

module.exports.verify = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    await User.findOne({ where: { id: userId } })
      .then((resp) => {
        req.user = resp;
        next();
      })
      .catch((err) => new Error(err));
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
};
