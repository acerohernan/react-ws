import express from "express";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { userJoin, getUsers, userLeave } from "./utils/user";

config();
const port = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());

let imageUrl, userRoom;
io.on("connection", (socket) => {
  console.log("Connection entablished with a client", socket.id);

  socket.on("user-joined", (data) => {
    const { roomId, userId, username, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, username, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    console.log("Joining to the room", user.room);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    console.log("Total users in the room", roomUsers);
    io.to(user.room).emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on("disconnect", () => {
    console.log("Leaving...");

    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`);
});
