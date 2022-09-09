const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + uuid.v4() + "-" + file.originalname);
  },
});

module.exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      ["jpg", "png", "jpeg", "gif"].includes(file.originalname.split(".")[1])
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("PNG, JPEG, JPG and GIF files are allowed to upload."),
        false
      );
    }
  },
});
