const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    const pictureName = uuidv4() + path.extname(file.originalname);
    cb(null, `pokemon-${pictureName}`);
  },
});

const uploadFile = (req, res, next) => {
  const upload = multer({ storage });

  return upload.single("image")(req, res, next);
};

module.exports = { uploadFile };
