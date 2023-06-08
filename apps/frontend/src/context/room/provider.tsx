import React, { useMemo } from "react";
import { RoomContextValue, User } from "./types";
import RoomContext from "./context";
import { CreateRoomFormValues, JoinRoomFormValues } from "../../api/types";
import API from "../../api";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

const RoomContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [roomId, setRoomId] = React.useState<string>("");

  const navigate = useNavigate();

  async function createRoom(form: CreateRoomFormValues) {
    await API.room.createRoom(form);
  }
  async function joinRoom(form: JoinRoomFormValues) {
    console.log("executing");
    /* Create the room in the server */
    await API.room.joinRoom(form);

    const user: User = {
      id: nanoid(),
      roomId: form.roomId,
      host: false,
      presenter: false,
      username: form.name,
    };

    /* Saving the user in state and in local storage*/
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    /* Redirect the user to the room page */
    navigate("/room");

    /* Give feedback to the user */
    toast.success("Succesful joined!");
  }

  function leftRoom() {
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Room deleted!");
  }

  const value: RoomContextValue = useMemo(
    () => ({
      roomId,
      user,
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
