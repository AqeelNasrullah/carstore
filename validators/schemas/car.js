const Joi = require("joi");

module.exports.createCar = Joi.object({
  coverImage: Joi.string().required(),
  brand: Joi.string().required(),
  title: Joi.string().required(),
  model: Joi.string().optional(),
  year: Joi.number().min(1).required(),
  price: Joi.number().min(1).required(),
  description: Joi.string().required(),
  specifications: Joi.string().required(),
  galleryImages: Joi.array().items(Joi.string()).required(),
});
