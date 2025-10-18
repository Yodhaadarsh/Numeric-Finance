require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");
const { initSocketServer } = require("./src/services/socket.service");
const http = require("http");

httpServer = http.createServer(app);

initSocketServer(httpServer);

connectDb();

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
