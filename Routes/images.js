const { ControllerWrapper } = require("../utils/ControllerWrapper");
const controller = require("../Controller/images");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    if (ext === "image") {
      fs.mkdir("./uploads/images", (err) => {
        cb(null, "./uploads/images");
      });
    } else {
      cb("Only image files are supported", null);
    }
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.filename}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", ControllerWrapper(controller.get_images));
router.post("/add", ControllerWrapper(controller.add_image));

module.exports = router;
