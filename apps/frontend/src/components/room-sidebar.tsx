import React from "react";

const users: Array<{ username: string; id: string }> = [
  {
    id: "1",
    username: "User1",
  },
  {
    id: "2",
    username: "User2",
  },
];

const RoomSidebar = () => {
  const sideBarRef = React.useRef<HTMLDivElement>(null);

  const openSideBar = () => {
    sideBarRef.current!.style.left = "0";
  };
  const closeSideBar = () => {
    sideBarRef.current!.style.left = -100 + "%";
  };

  return (
    <>
      <button
        className="btn btn-dark btn-sm"
        onClick={openSideBar}
        style={{ position: "absolute", top: "5%", left: "5%" }}
      >
        Users
      </button>
      <div
        className="position-fixed pt-2 h-100 bg-dark"
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          transition: "0.3s all ease-in-out",
          zIndex: "9999",
        }}
      >
        <button
          className="btn btn-block border-0 form-control rounded-0 btn-light"
          onClick={closeSideBar}
        >
          Close
        </button>
        <div className="w-100 mt-5">
          {users.map((usr, index) => (
            <p key={index} className="text-white text-center py-2">
              {usr.username}
              {usr.id === "socket.id" && " - (You)"}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomSidebar;
