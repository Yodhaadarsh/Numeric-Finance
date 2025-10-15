const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const { loginController } = require("./controllers/auth.controller");

// middlewares
app.use(express.json());
app.use(cookieParser());
// routes

app.use("/auth", authRoutes);


module.exports = app;
