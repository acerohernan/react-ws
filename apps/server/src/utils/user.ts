import { User } from "../types";

const users: Array<User> = [];

// Join user to chat
export const userJoin = (id, username, room, host, presenter) => {
  const user: User = { id, username, room, host, presenter };

  users.push(user);
  return user;
};

export const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUsers = (room) => {
  const RoomUsers: Array<User> = [];
  users.map((user) => {
    if (user.room == room) {
      RoomUsers.push(user);
    }
  });

  return RoomUsers;
};
