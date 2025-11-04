const { Server } = require("socket.io");
const cookie = require("cookie");
const { generateText, AiChat } = require("./ai.service");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const ExpenseTrackerModel = require("../models/expense.tracker.model");
const {
  sendMessageController,
} = require("../controllers/groupChat.controller");
const AiMessagesModel = require("../models/aiMessages.Model");

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
    // for create a new expense with ai-suggestion
    socket.on("send-data", async (data) => {
      console.log("Data received from frontend:", data);

      // Example: process data and send back

      // const response = `Received your data: ${JSON.stringify(data)}`;
      try {
        const response = await generateText(`${JSON.stringify(data)}`);
        const newExpense = await ExpenseTrackerModel.create({
          user: socket.user._id,
          income: data.income,
          education: data.education,
          medicine: data.medicine,
          grocery: data.grocery,
          others: data.others,
          year: data.year,
          month: data.month,
          aiSuggest: response,
        });
        // console.log(newExpense);

        socket.emit("receive-data", newExpense);
      } catch (error) {
        console.log(error);
      }
    });

    // for chat with ai
    socket.on("user-message", async (data) => {
      console.log(`Data recieved from frontend : ${data}`);

      const msg = await AiMessagesModel.create({
        text: data,
        type: "user",
        user: socket.user._id,
      });

      console.log(msg);
      const allMessages = await AiMessagesModel.find();

      const response = await AiChat(allMessages);

      const aiResponse = await AiMessagesModel.create({
        text: response,
        type: "ai",
        user: socket.user._id,
      });

      // console.log(response);

      socket.emit("ai-message", response);
    });

    // for chat in the group
    socket.on("joinGroup", async (groupid) => {
      socket.join(groupid);
      console.log(`User joined group: ${groupid}`);
    });

    // for chat in group
    socket.on("sendMessage", async ({ id, message }) => {
      await sendMessageController(socket.user._id, id, message, io);

      //  console.log(socket.user._id , id , message , io);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};

module.exports = { initSocketServer };
