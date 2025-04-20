// backend/index.js or .ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { UserManager } from "./managers/UserManager";

let userManager : UserManager = new UserManager()

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({name}) => {
      console.log(`use with username: ${name} joined`);
      userManager.handleUserJoined({name , socketId:socket.id})
      
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
