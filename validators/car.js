const carSchema = require("./schemas/car");

module.exports.createCar = (req, res, next) => {
  const values = carSchema.createCar.validate(req.body);
  if (values.error) {
    res.status(400).json({ message: values.error.details[0].message });
  } else {
    next();
  }
};
