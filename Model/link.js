const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "URL is required!"],
    },
    addedBy: {
      type: String,
      required: [true, "Added By is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("links", linkSchema);
