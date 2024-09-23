const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Mongoose middleware
userSchema.pre("save", async function (next) {
  // this-> every single instance of userSchema
  if (!this.isModified("password")) {
    return next();
  }
  try {
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function (password, next) {
  try {
    const isMatched = await bcrypt.compare(password, this.password);
    return isMatched;
  } catch (error) {
    next(error);
  }
};
module.exports = mongoose.model("User", userSchema);
