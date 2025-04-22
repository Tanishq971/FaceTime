import { UserManager } from "./UserManager";
import { User } from "./UserManager";
let GLOBAL_ROOM_ID = 1;


export interface Room{
    user1:User;
    user2:User;
    roomId:number
}
export class RoomManager{
     rooms : Map<number, Room>;
    private static ROOM_ID = 1;

   constructor(){
    this.rooms = new Map();
   }
    
    createRoom(user1:User , user2:User){
       
       if(!user1) return;
       if(!user2) return;
       const roomId = this.generateRoomID();
       this.rooms.set(roomId , {user1 , user2 ,roomId})
       return roomId;
    }
   
    generateRoomID(){
        return GLOBAL_ROOM_ID++;
    }

}