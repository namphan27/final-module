import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Ket noi", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", (msg) => {
    io.to(msg.recipientId).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("Ngat ket noi", socket.id);
  });
});
