import { io } from "socket.io-client";
const socket = io("ws://localhost:3000", {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});
socket.on("connect", () => {
  console.log("✅ Da ket noi server", socket.id);
});

export default socket;
