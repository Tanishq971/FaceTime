import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";


export interface User{
    name:string;
    socketId:string
}


export class UserManager{
     users:User[];
    private roomManager :RoomManager;
   
    constructor(){
        this.users = [];
        this.roomManager = new RoomManager();
    }

    handleUserJoined(user:User){
        if(this.users.length <1){
            this.users.push(user);
            console.log("Waiting in the quueue!");
            return;
        }


        console.log(`user with username ${user.name} and id ${user.socketId}`);
        let user2 = this.users.shift();
        if(!user2) return ;


        this.roomManager.createRoom(user , user2);
    }
}