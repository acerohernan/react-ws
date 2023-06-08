import React, { useMemo } from "react";
import { RoomContextValue, User } from "./types";
import RoomContext from "./context";
import { CreateRoomFormValues, JoinRoomFormValues } from "../../api/types";
import API from "../../api";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";
import { io } from "socket.io-client";

const server = import.meta.env.VITE_API_URL;
const socket = io(server, {
  transports: ["websocket"],
});

const RoomContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [roomId, setRoomId] = React.useState<string>("");

  const navigate = useNavigate();

  async function createRoom(form: CreateRoomFormValues) {
    /* Creating the user information */
    const user: User = {
      id: nanoid(),
      roomId: form.code,
      host: true,
      presenter: true,
      username: form.name,
    };

    /* Emit the event  with the socket */
    socket.emit("user-joined", user);

    /* Saving the user in state and in local storage*/
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    /* Redirect the user to the room page */
    navigate("/room");

    /* Give feedback to the user */
    toast.success("Succesful joined!");
  }
  async function joinRoom(form: JoinRoomFormValues) {
    /* Saving the user information */
    const user: User = {
      id: nanoid(),
      roomId: form.roomId,
      host: false,
      presenter: false,
      username: form.name,
    };

    /* Emit the event  with the socket */
    socket.emit("user-joined", user);

    /* Saving the user in state and in local storage*/
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    /* Redirect the user to the room page */
    navigate("/room");

    /* Give feedback to the user */
    toast.success("Succesful joined!");
  }

  function leftRoom() {
    /* Deleting the user information */
    localStorage.removeItem("user");

    /* Redirect the user to the home page */
    navigate("/");

    /* Give feedback */
    toast.success("Room deleted!");
  }

  const value: RoomContextValue = useMemo(
    () => ({
      roomId,
      user,
      socket,
      actions: {
        createRoom,
        joinRoom,
        leftRoom,
      },
    }),
    []
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export default RoomContextProvider;
