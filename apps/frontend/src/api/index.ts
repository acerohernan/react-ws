import { CreateRoomFormValues, JoinRoomFormValues } from "./types";

const API = {
  room: {
    createRoom: async (data: CreateRoomFormValues) => true,
    joinRoom: async (data: JoinRoomFormValues) => true,
  },
};

export default API;
