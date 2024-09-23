const { User } = require("../models");
const CustomError = require("../Utils/Error/CustomError");
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

module.exports.signin = async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  // If user doesn't exist
  if (!user) {
    const err = new CustomError("Incorrect username or password", 400);
    return next(err);
  }
  // check password is correct or not
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    const err = new CustomError("Incorrect username or password", 400);
    return next(err);
  }
  const token = createJWTToken({
    id: user._id,
    username,
    email,
  });

  return res.status(200).json({
    message: "Login successfully",
    data: {
      id: user._id,
      username,
      email,
      token,
    },
  });
};
