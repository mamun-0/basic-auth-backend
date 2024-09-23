const express = require("express");
const { signup } = require("../handlers/auth");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
