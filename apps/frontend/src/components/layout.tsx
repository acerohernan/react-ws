import { useEffect } from "react";
import RoomContextProvider from "../context/room/provider";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  /* useEffect(() => {
    const { pathname: path } = window.location;
    const user = localStorage.getItem("user");

    if (!user && path === "/room") navigate("/");
    if (user && path === "/") navigate("/room");
  }, []); */

  return (
    <RoomContextProvider>
      <Outlet />
    </RoomContextProvider>
  );
};

export default Layout;
