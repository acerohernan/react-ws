import { createBrowserRouter } from "react-router-dom";
import RoomView from "./views/room";
import HomeView from "./views/home";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "room",
        element: <RoomView />,
      },
    ],
  },
]);

export default router;
