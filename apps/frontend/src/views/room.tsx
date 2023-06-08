import { useRoomContext } from "../context/room/hooks";

const RoomView = () => {
  const {
    actions: { leftRoom },
  } = useRoomContext();

  return (
    <div>
      RoomView
      <button className="btn btn-primary" onClick={() => leftRoom()}>
        Delete Room
      </button>
    </div>
  );
};

export default RoomView;
