const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "This is a protected route",
    user,
  });
});

module.exports = router;
