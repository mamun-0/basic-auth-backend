const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/backend", () =>
  console.log("Database connected.")
);

module.exports.User = require("./user");
