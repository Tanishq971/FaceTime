import { useSocket } from "./socket";
import { useEffect , useRef } from "react";
import { useParams } from "react-router";

const Room = () => {
    const {socket} = useSocket();
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null> (null);
    const roomId = useParams<{name:string}>()


    useEffect(()=>{
        async function fun(){
            
            pcRef.current = new RTCPeerConnection();
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }

            stream.getTracks().forEach((track) => {
                pcRef.current?.addTrack(track, stream);
            });

            pcRef.current.ontrack = (event)=>{
                if(remoteVideoRef.current){
                    remoteVideoRef.current.srcObject = event.streams[0]
                }
            }

            const offer = await pcRef.current.createOffer()
            await pcRef.current.setLocalDescription(offer);
            pcRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                  socket.emit("ice-candidate", { roomId, candidate: event.candidate });
                }
              }; 

            socket.emit("offer" , {roomId  , offer});
        }

        fun()


        socket.on("offer" , handleOffer)
        socket.on("answer" , handleAnswer);

} , [])
     

    const handleOffer = async ({offer}:any) =>{
        await pcRef.current?.setRemoteDescription(offer)//can be breakking
        const answer = await pcRef.current?.createAnswer()
        await pcRef.current?.setLocalDescription(answer)
       socket.emit("answer" , {roomId , answer});
    }

    const handleAnswer = async ({answer}:any)=>{
          await pcRef.current?.setRemoteDescription(answer)
    }

    return <div>This is Room
        <video ref={localVideoRef} autoPlay playsInline muted width="300" />
        <video ref={remoteVideoRef} autoPlay playsInline muted width="3000"/>
        {socket.id}
    </div>;
}


export default Room;