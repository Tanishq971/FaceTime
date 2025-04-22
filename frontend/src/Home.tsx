import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Use react-router-dom for TypeScript
import { useSocket } from "./socket";

function Home() {
  const [name, setName] = useState<string>("");
  const [waitingMessage, setWaitingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle pairing event
    socket.on("paired", (data) => {
      console.log("Paired with room:", data.room , data.user1 ,data.user2) ;
      setWaitingMessage(null); // Clear waiting message
      navigate(`/room/${data.room}`); // Navigate to room
    });

    // Handle waiting event
    socket.on("waiting", ({ message }) => {
      console.log("Waiting:", message);
      setWaitingMessage(message); // Display waiting message
    });

    // Handle errors (optional, if backend emits errors)
    socket.on("error", ({ message }) => {
      setError(message);
      setWaitingMessage(null);
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off("paired");
      socket.off("waiting");
      socket.off("error");
    };
  }, [socket, navigate]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }
    setError(null);
    socket.emit("join-room", { name }); // Use 'join-queue' to match backend
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Omegle Clone</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "200px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Join Chat!
        </button>
      </form>
      {waitingMessage && (
        <p style={{ color: "blue", marginTop: "10px" }}>{waitingMessage}</p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
}

export default Home;