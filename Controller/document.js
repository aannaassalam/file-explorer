const Document = require("../Model/document");

module.exports.get_docs = async (req, res) => {
  const links = await Document.find({}).sort();
  res.json(links);
};

module.exports.add_doc = async (req, res) => {
  const { addedBy } = req.body;
  const file = req.file;
  const added_link = await Document.create({
    addedBy,
    fileName: file.filename,
    filepath: file.path,
  });
  res.json({
    message: "Document added successfully",
    data: added_link,
  });
};
