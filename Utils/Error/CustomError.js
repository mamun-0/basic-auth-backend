module.exports = class CustomError extends Error {
  constructor(message = "Oops! Something went wrong.", status = 500) {
    super(message);
    this.status = status;
  }
};
