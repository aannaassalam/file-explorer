const { ControllerWrapper } = require("../utils/ControllerWrapper");
const controller = require("../Controller/document");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[0];
    if (ext === "application") {
      fs.mkdir("./uploads/documents", (err) => {
        cb(null, "./uploads/documents");
      });
    } else {
      cb("Only document files are supported", null);
    }
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.filename}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", ControllerWrapper(controller.get_docs));
router.post("/add", ControllerWrapper(controller.add_doc));

module.exports = router;
