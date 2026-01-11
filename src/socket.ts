import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");
socket.on("connect", () => {
  console.log("✅ Da ket noi server", socket.id);
});

export default socket;
