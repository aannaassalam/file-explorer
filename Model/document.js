const { Schema, model } = require("mongoose");

const documentSchema = new Schema(
  {
    filepath: {
      type: String,
      required: [true, "File Path is required!"],
    },
    fileName: {
      type: String,
      required: [true, "FileName is required!"],
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

module.exports = model("documents", documentSchema);
