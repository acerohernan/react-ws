import { Socket } from "socket.io-client";
import { CreateRoomFormValues, JoinRoomFormValues } from "../../api/types";

export type User = {
  roomId: string;
  id: string;
  username: string;
  host: boolean;
  presenter: boolean;
};

export type RoomContextValue = {
  user: User | null;
  roomId: string;
  socket: Socket;
  actions: RoomContextActions;
};

export type RoomContextActions = {
  joinRoom: (form: JoinRoomFormValues) => Promise<void>;
  createRoom: (form: CreateRoomFormValues) => Promise<void>;
  leftRoom: () => void;
};
