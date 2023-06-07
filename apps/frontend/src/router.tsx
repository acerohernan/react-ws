import { createBrowserRouter } from "react-router-dom";
import RoomView from "./views/room";
import HomeView from "./views/home";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeView />,
  },
  {
    path: "room",
    element: <RoomView />,
  },
]);

export default router;
