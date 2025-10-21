const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const expenseRoutes = require("./routes/expense.route");
const groupRoutes = require("./routes/group.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);

// routes

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/group", groupRoutes);

module.exports = app;
