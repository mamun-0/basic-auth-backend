module.exports = class CustomError extends Error {
  constructor(message = "Oops! Something went wrong.", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
};
