const { ControllerWrapper } = require("../utils/ControllerWrapper");
const controller = require("../Controller/link");
const multer = require("multer");
const router = require("express").Router();

router.get("/", ControllerWrapper(controller.get_links));
router.post("/add", ControllerWrapper(controller.add_links));

module.exports = router;
