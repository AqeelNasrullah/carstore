const router = require("express").Router();
const { upload } = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const fs = require("fs");

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.post(
  "/single",
  authenticate.verify,
  upload.single("image"),
  (req, res) => {
    res.status(200).json({
      name: req.file.filename,
    });
  }
);

router.post(
  "/multiple",
  authenticate.verify,
  upload.array("images"),
  (req, res) => {
    const files = [];
    req.files.forEach((file) => {
      files.push({ name: file.filename });
    });
    res.status(200).json(files);
  }
);

router.post("/remove", authenticate.verify, (req, res) => {
  fs.unlink("./public/images/" + req.body.name, (err) => {
    if (err) new Error(err);
    res.status(200).json({ message: "Image deleted." });
  });
});

module.exports = router;
