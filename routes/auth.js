const express = require("express");
const { signup, signin } = require("../handlers/auth");
const router = express.Router();
// validators
const {
  signup: signupValidator,
  signin: signinValidator,
} = require("../middleware/inputValidation");
const wrapAsync = require("../Utils/Error/wrapAsync");

router.post("/signup", signupValidator, wrapAsync(signup));
router.post("/signin", signinValidator, wrapAsync(signin));
module.exports = router;
