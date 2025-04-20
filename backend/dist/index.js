"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/index.js or .ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const UserManager_1 = require("./managers/UserManager");
let userManager = new UserManager_1.UserManager();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-room", ({ name }) => {
        console.log(`use with username: ${name} joined`);
        userManager.handleUserJoined({ name, socketId: socket.id });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
server.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
