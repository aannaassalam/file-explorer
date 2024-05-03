const Image = require("../Model/images");

module.exports.get_images = async (req, res) => {
  const links = await Image.find({}).sort();
  res.json(links);
};

module.exports.add_image = async (req, res) => {
  const { addedBy } = req.body;
  const file = req.file;
  const added_link = await Image.create({
    addedBy,
    fileName: file?.filename,
    filepath: file?.path,
  });
  res.json({
    message: "Image added successfully",
    data: added_link,
  });
};
