const AppError = require("../AppError");

const ErrorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      type: "ValidationError",
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    });
  }

  return res.status(500).send("Internal Server Error");
};

module.exports = ErrorHandler;
