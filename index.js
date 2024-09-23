const express = require("express");
const wrapAsync = require("./Utils/Error/wrapAsync");
const CustomError = require("./Utils/Error/CustomError");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    throw new CustomError("Not handle", 521);
  })
);

// ------Error Handling------

// Path Not Found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Handle Async & Sync Error
/**
 * ⚠ If any async function throw an error you should catch and pass the error object into next function otherwise it will not handle by this error handle middleware.
 * **/
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Oops! Something went wrong.",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running..."));
