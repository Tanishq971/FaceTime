import { Socket } from 'socket.io-client'
import { create } from 'zustand'
import { io } from 'socket.io-client';


interface socketType{
  socket:Socket;
}


export const useSocket = create<socketType>(() => {
    
  return {
    socket: io("http://localhost:3000"), // Initialize socket with a placeholder
  };
})


