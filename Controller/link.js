const Links = require("../Model/link");

module.exports.get_links = async (req, res) => {
  const links = await Links.find({}).sort();
  res.json(links);
};

module.exports.add_links = async (req, res) => {
  const { addedBy } = req.body;
  const added_link = await Links.create({
    addedBy,
    url,
  });
  res.json({
    message: "Link added successfully",
    data: added_link,
  });
};
