const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Links = require("./Model/link.js");
const ErrorHandler = require("./middleware/errorHandler.js");

require("dotenv").config();

const csvRoutes = require("./Routes/csv.js");
const documentRoutes = require("./Routes/document.js");
const imageRoutes = require("./Routes/images.js");
const linkRoutes = require("./Routes/link.js");

const PORT = process.env.PORT || 5000;

const app = express();

cors({
  origin: "*",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ErrorHandler);

app.get("/", async (req, res) => {
  res.send("running");
});

app.use("/api/csv", csvRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/link", linkRoutes);

mongoose
  .connect("mongodb://139.59.84.27:27017/", {
    directConnection: true,
    authSource: process.env.DB_NAME,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));
