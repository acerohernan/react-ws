import React from "react";
import { RoomContextValue } from "./types";

const RoomContext = React.createContext<RoomContextValue>({
  roomId: "",
  user: null,
  actions: {
    joinRoom: async () => {
      return;
    },
    createRoom: async () => {
      return;
    },
    leftRoom: async () => {
      return;
    },
  },
});

export default RoomContext;
