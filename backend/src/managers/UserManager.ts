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

        let user2 = this.users.pop();
        if(!user2) return ;

       const roomNo = this.roomManager.createRoom(user , user2);
       if(!roomNo){
        return
       }
       
       return this.roomManager.rooms.get(roomNo);
       
    }
    
    joinHandler(){

    }


}