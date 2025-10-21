const { Server } = require("socket.io");
const cookie = require("cookie");
const { generateText, AiChat } = require("./ai.service");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const ExpenseTracker = require("../models/expense.tracker.model");

// const userSocketMap = new Map();
// let io;

const initSocketServer = async (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

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

    // Listen for "send-data" from frontend
    socket.on("send-data", async (data) => {
      console.log("Data received from frontend:", data);

      // Example: process data and send back

      // const response = `Received your data: ${JSON.stringify(data)}`;
      const response = await generateText(`${JSON.stringify(data)}`);


      socket.emit("receive-data", response);
    });


    socket.on("user-message" , async (data) => {
      console.log(`Data recieved from frontend : ${data}`);


      const response = await AiChat(data);


      socket.emit("ai-message" ,  response);


    })

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });

   
  });
};

module.exports = { initSocketServer };
