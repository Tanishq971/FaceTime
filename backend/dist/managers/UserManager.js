"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.users = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    handleUserJoined(user) {
        if (this.users.length < 1) {
            this.users.push(user);
            console.log("Waiting in the quueue!");
            return;
        }
        console.log(`user with username ${user.name} and id ${user.socketId}`);
        let user2 = this.users.shift();
        if (!user2)
            return;
        this.roomManager.createRoom(user, user2);
    }
}
exports.UserManager = UserManager;
