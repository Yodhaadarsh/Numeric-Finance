const express = require("express");
const {
  registerController,
  loginController,
  updateProfileController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const userModel = require("../models/user.model");

const router = express.Router();

// Registration route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// update name route
router.put("/update-prfile", authMiddleware, updateProfileController);

// update password route
router.put("/update-password", authMiddleware, updatePasswordController);

// delete user route
router.delete("/delete-user", authMiddleware, deleteUserController);

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json({
      success: true,
      message: "This is a protected route",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
