const { User } = require("../models");
const { createJWTToken } = require("../Utils/JWT");

module.exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, username, email } = user;
    const token = createJWTToken({ id, username, email });

    return res.status(200).json({
      message: "User created",
      data: {
        id,
        username,
        email,
        token,
      },
    });
  } catch (error) {
    error.status = 400;
    error.message = "Failed to create a user";
    return next(error);
  }
};
