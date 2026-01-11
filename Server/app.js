import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Ket noi", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
    socket.broadcast.emit("new_notification", {
      user: data.sender,
      text: `Bạn nhận được tin nhắn mới từ ${data.sender}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("Ngat ket noi", socket.id);
  });
});
