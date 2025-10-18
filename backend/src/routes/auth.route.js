const express = require("express");
const {
  registerController,
  loginController,
  updateProfileController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

router.get("/test", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "This is a protected route",
    user,
  });
});

module.exports = router;
