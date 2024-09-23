const jwt = require("jsonwebtoken");

module.exports.createJWTToken = function (arg) {
  return jwt.sign(arg, "process.env.JWT_SECRET->refactor later"); //return string token
};

module.exports.checkJWTToken = function (arg) {
  return jwt.verify(arg, "process.env.JWT_SECRET->refactor later"); //return boolean
};
