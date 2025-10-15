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

module.exports = { registerController, loginController };
