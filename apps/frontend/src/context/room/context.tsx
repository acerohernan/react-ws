import React from "react";
import { RoomContextValue } from "./types";

const RoomContext = React.createContext<RoomContextValue>(
  {} as RoomContextValue
);

export default RoomContext;
