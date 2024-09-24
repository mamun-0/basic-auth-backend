const { body, check } = require("express-validator");

module.exports = [
  // check only uername is provided into body
  // value-> username corresponding field value
  // req-> Express req object
  check("username")
    .if((value, { req }) => req.body.username)
    .isString()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username must be 4 characters long")
    .trim(),
  // Always validate password
  body("password")
    .isString()
    .withMessage("Password must be string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),
  // Same for username
  check("email")
    .if((value, { req }) => req.body.email)
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
];
