"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        if (!user1)
            return;
        if (!user2)
            return;
        const roomId = this.generateRoomID();
        this.rooms.set(roomId, { user1, user2, roomId });
        console.log(this.rooms.get(roomId), "GOt the rooms");
    }
    generateRoomID() {
        return GLOBAL_ROOM_ID++;
    }
}
exports.RoomManager = RoomManager;
RoomManager.ROOM_ID = 1;
