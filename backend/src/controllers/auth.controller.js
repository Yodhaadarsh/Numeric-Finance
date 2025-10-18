const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const registerController = async (req, res) => {
  let {
    userId,
    email,
    fullname: { fristname, lastname },
    password,
  } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(200).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log(userId); // e.g. "X8P2B9"

    const newuser = await usermodel.create({
      email,
      userId: userId,
      fullname: {
        fristname,
        lastname,
      },
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newuser._id, email: newuser.email },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);

    res.json({
      message: "User created sucessfully",
      newuser,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if (!isPasswordvalid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfileController = async (req, res) => {
  let { fristname, lastname } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    user.fullname.fristname = fristname || user.fullname.fristname;
    user.fullname.lastname = lastname || user.fullname.lastname;
    await user.save();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json({
    message: "Update profile route",
    user,
  });
};

const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide old and new password" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await userModel.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "You are logged in with Google, no password set" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const { password, ...userData } = user.toObject();
    res.json({ message: "Password updated successfully", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    let { password, pin, text } = req.body;
    let userId = req.user._id;

    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!password || !pin || !text) {
      return res
        .status(400)
        .json({ message: "Please provide password, pin and text" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (pin !== user.userId || text !== "DELETE") {
      return res.status(401).json({ message: "Invalid pin or text" });
    }

    await userModel.findByIdAndDelete(userId);

    await res.clearCookie("token");

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  updateProfileController,
  updatePasswordController,
  deleteUserController,
};
