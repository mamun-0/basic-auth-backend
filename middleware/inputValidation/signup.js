const { body } = require("express-validator");

module.exports = [
  body("username")
    .isString()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username must be 4 characters long")
    .trim(),
  body("password")
    .isString()
    .withMessage("Password must be string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
];
