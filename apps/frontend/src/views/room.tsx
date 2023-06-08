import React, { ChangeEvent, MouseEventHandler } from "react";
import RoomSidebar from "../components/room-sidebar";
import RoomCanvas from "../components/canvas";
import io from "socket.io-client";
import toast from "../utils/toast";
import { useRoomContext } from "../context/room/hooks";
import ClientRoom from "../components/client-room";

const RoomView = () => {
  const {
    socket,
    user,
    actions: { leftRoom },
  } = useRoomContext();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const ctx = React.useRef(null);
  const [color, setColor] = React.useState("#000000");
  const [elements, setElements] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [tool, setTool] = React.useState("pencil");
  const [users, setUsers] = React.useState<Array<any>>([]);
  const [userNo, setUserNo] = React.useState(0);

  React.useEffect(() => {
    socket.on("message", (data) => {
      toast.success(data.message);
    });
  }, []);
  React.useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };
  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  return (
    <div>
      <RoomSidebar />

      {user?.presenter ? (
        <div className="container-fluid">
          <div className="row">
            <h1 className="display-5 pt-4 pb-3 text-center">
              React Drawing App - users online:{userNo}
            </h1>
          </div>
          <div className="row justify-content-center align-items-center text-center py-2">
            <div className="col-md-2">
              <div className="color-picker d-flex align-items-center justify-content-center">
                Color Picker : &nbsp;
                <input
                  type="color"
                  value={color}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColor(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tools"
                  id="pencil"
                  value="pencil"
                  checked={tool === "pencil"}
                  onClick={(e: any) => setTool(e.target.value)}
                  readOnly={true}
                />
                <label className="form-check-label" htmlFor="pencil">
                  Pencil
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tools"
                  id="line"
                  value="line"
                  checked={tool === "line"}
                  onClick={(e: any) => setTool(e.target.value)}
                  readOnly={true}
                />
                <label className="form-check-label" htmlFor="line">
                  Line
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tools"
                  id="rect"
                  value="rect"
                  checked={tool === "rect"}
                  onClick={(e: any) => setTool(e.target.value)}
                  readOnly={true}
                />
                <label className="form-check-label" htmlFor="rect">
                  Rectangle
                </label>
              </div>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={elements.length === 0}
                onClick={() => undo()}
              >
                Undo
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-outline-primary ml-1"
                disabled={history.length < 1}
                onClick={() => redo()}
              >
                Redo
              </button>
            </div>
            <div className="col-md-1">
              <div className="color-picker d-flex align-items-center justify-content-center">
                <input
                  type="button"
                  className="btn btn-danger"
                  value="clear canvas"
                  onClick={clearCanvas}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <RoomCanvas
              canvasRef={canvasRef}
              ctx={ctx}
              color={color}
              setElements={setElements}
              elements={elements}
              tool={tool}
              socket={socket}
            />
          </div>
        </div>
      ) : (
        <ClientRoom />
      )}

      <button className="btn btn-primary" onClick={() => leftRoom()}>
        Exit Room
      </button>
    </div>
  );
};

export default RoomView;
