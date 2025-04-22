import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { UserManager } from "./managers/UserManager";
import { RoomManager } from "./managers/RoomManager";
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
    
      let roomInfo = userManager.handleUserJoined({name , socketId:socket.id})
    
      if(!roomInfo){
        socket.emit("waiting" , {message:"Waiting for  new user  to join the room !"})
        return
      }
      const {user1 , user2 , roomId} = roomInfo
      const room = roomId.toString();
    
      socket.join(room);
      io.sockets.sockets.get(user2.socketId)?.join(room);
      
      io.to(room).emit("paired", {
        room,user1, user2
      })
      
  });

  socket.on("offer" , ({roomId , offer})=>{
      socket.to(roomId).emit("offer" , offer)
  })
   
 socket.on("answer" , ({answer , roomId})=>{
   socket.to(roomId).emit("answer" , answer)
 })

 
 socket.on("ice-candidate", (data) => {
  socket.to(data.roomId).emit("ice-candidate", data);
});



  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));