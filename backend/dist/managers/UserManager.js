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
        let user2 = this.users.pop();
        if (!user2)
            return;
        const roomNo = this.roomManager.createRoom(user, user2);
        if (!roomNo) {
            return;
        }
        return this.roomManager.rooms.get(roomNo);
    }
    joinHandler() {
    }
}
exports.UserManager = UserManager;
