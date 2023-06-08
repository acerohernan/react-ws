import CreateRoomForm from "../components/create-room";
import JoinRoomForm from "../components/join-room";

const HomeView = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center my-5">
            Welcome To Realtime Whiteboard Sharing App
          </h1>
        </div>
      </div>
      <div className="row mx-5 mt-5">
        <CreateRoomForm />
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default HomeView;
