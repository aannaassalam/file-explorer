const Csv = require("../Model/csv");

module.exports.get_csvs = async (req, res) => {
  const links = await Csv.find({}).sort();
  res.json(links);
};

module.exports.add_csv = async (req, res) => {
  const { addedBy, url } = req.body;
  const file = req.file;
  const added_link = await Csv.create({
    addedBy,
    fileName: file.filename,
    filepath: file.path,
  });
  res.json({
    message: "Csv added successfully",
    data: added_link,
  });
};
