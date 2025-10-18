const { Server } = require("socket.io");
const cookie = require("cookie");
const { generateText } = require("./ai.service");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userSocketMap = new Map();
let io;

const initSocketServer = async (httpServer) => {
  const io = new Server(httpServer, {});

  // Middleware for authentication
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Authentication error: No token Provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error : invalid token"));
    }
  });

  // Socket connection handler
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // ai-message event listener
    socket.on("ai-message", async (data) => {
      let response = await generateText(data);
      console.log(data);

      socket.emit("ai-response", {
        message: response,
      });
    });
  });
};

module.exports = { initSocketServer };
