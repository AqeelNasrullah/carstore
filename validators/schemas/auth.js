const joi = require("joi");

module.exports.createUser = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});

module.exports.login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});
