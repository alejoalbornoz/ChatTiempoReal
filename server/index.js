import express from "express";
import morgan from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server,{
  connectionStateRecovery:{
    
  }
});

io.on("connection", (socket) => {
  console.log("a user has connected");

  socket.on("disconnect", () => {
    console.log("a user has desconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.set("port", 3000);
server.listen(app.get("port"), () => {
  console.log(`Server listening on port http://localhost:${app.get("port")}`);
});
