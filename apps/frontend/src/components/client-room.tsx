import React from "react";
import toast from "../utils/toast";
import { useRoomContext } from "../context/room/hooks";

const ClientRoom = () => {
  const { socket } = useRoomContext();

  const imgRef = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    socket.on("message", (data) => {
      toast.success(data.message);
    });
  }, []);
  /*   React.useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []); */
  React.useEffect(() => {
    socket.on("canvasImage", (data) => {
      console.log("Canvas image", data);

      if (!imgRef.current) return;

      imgRef.current.src = data;
    });
  }, []);

  const userNo = 0;

  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online:{userNo}
        </h1>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto
      mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
