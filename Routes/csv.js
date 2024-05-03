const { ControllerWrapper } = require("../utils/ControllerWrapper");
const controller = require("../Controller/csv");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (ext === "csv") {
      fs.mkdir("./uploads/csvs", (err) => {
        cb(null, "./uploads/csvs");
      });
    } else {
      cb("Only csv files are supported", null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.filename}-${Date.now()}.csv`);
  },
});

const upload = multer({ storage });

router.get("/", ControllerWrapper(controller.get_csvs));
router.post("/add", ControllerWrapper(controller.add_csv));

module.exports = router;
