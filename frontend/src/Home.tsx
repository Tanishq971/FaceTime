import { useState } from "react";
import { useNavigate } from "react-router";
import { useSocket } from "./socket";
function Home() {
      const [name , setName] = useState<string>("");
      const {socket} = useSocket()

      const navigate = useNavigate();

      function handleSubmit(e:any){
        e.preventDefault();
        socket.emit("join-room" , {name});
        navigate(`/room/${name}`)
      }
  return <form onSubmit={handleSubmit}>
       <input type="text" placeholder="Name here" value={name} onChange={(e)=>setName(e.target.value)}></input>
       <button type="submit">Join Room!</button>
  </form>
}

export default Home;
