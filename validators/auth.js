const authSchema = require("./schemas/auth");

module.exports.createUser = (req, res, next) => {
  const values = authSchema.createUser.validate(req.body);
  if (values.error) {
    res.status(400).json({ message: values.error.details[0].message });
  } else {
    next();
  }
};

module.exports.login = (req, res, next) => {
  const values = authSchema.login.validate(req.body);
  if (values.error) {
    res.status(400).json({ message: values.error.details[0].message });
  } else {
    next();
  }
};
