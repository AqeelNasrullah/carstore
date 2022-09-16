const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const carValidator = require("../validators/car");

const { Car, GalleryImage } = require("../models");

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.get("/", async (req, res) => {
  await Car.findAll({ where: { isDeleted: false } })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => new Error(err));
});

router.get("/:id", async (req, res) => {
  await Car.findOne({ where: { id: req.params.id }, include: "gallery" })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => new Error(err));
});

router.post(
  "/create",
  authenticate.verify,
  carValidator.createCar,
  async (req, res) => {
    await Car.create({
      coverImage: req.body.coverImage,
      brand: req.body.brand,
      title: req.body.title,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      specifications: req.body.specifications,
    })
      .then((resp) => {
        if (resp) {
          const images = [];
          req.body.galleryImages.forEach(async (image) => {
            const img = await GalleryImage.create({
              carId: resp.id,
              name: image,
            });
            images.push(img);
          });
          return images;
        }
      })
      .then((resp) => {
        if (resp) {
          res.status(200).json({ message: "Car added successfully." });
        }
      })
      .catch((err) => new Error(err));
  }
);

router.put("/update/:id", authenticate.verify, async (req, res) => {
  const id = req.params.id;

  await GalleryImage.destroy({ where: { carId: id } });

  await Car.update(
    {
      coverImage: req.body.coverImage,
      brand: req.body.brand,
      title: req.body.title,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      specifications: req.body.specifications,
    },
    { where: { id } }
  )
    .then((resp) => {
      if (resp) {
        console.log(resp);
        const images = [];
        req.body.galleryImages.forEach(async (image) => {
          const img = await GalleryImage.create({
            carId: id,
            name: image,
          });
          images.push(img);
        });
        return images;
      }
    })
    .then((resp) => {
      if (resp) {
        res.status(200).json({ message: "Car updated successfully." });
      }
    })
    .catch((err) => new Error(err));
});

router.delete("/delete/:id", authenticate.verify, async (req, res) => {
  const id = req.params.id;
  await Car.update({ isDeleted: true }, { where: { id: id } })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => new Error(err));
});

router.get("/active/:id", authenticate.verify, async (req, res) => {
  const id = req.params.id;
  await Car.update({ isDeleted: false }, { where: { id: id } })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => new Error(err));
});

module.exports = router;
