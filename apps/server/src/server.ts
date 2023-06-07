import express from "express";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

config();
const port = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("A new client is connected: ", socket.client);
});
