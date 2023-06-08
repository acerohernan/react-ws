import { createBrowserRouter } from "react-router-dom";
import RoomView from "./views/room";
import HomeView from "./views/home";
import Layout from "./components/layout";
import ClientView from "./views/client";

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
      {
        path: "client",
        element: <ClientView />,
      },
    ],
  },
]);

export default router;
