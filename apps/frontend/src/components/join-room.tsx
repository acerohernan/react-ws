import { useForm } from "react-hook-form";
import { JoinRoomFormValues } from "../api/types";
import { useRoomContext } from "../context/room/hooks";

const JoinRoomForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JoinRoomFormValues>();

  const {
    actions: { joinRoom },
  } = useRoomContext();

  const onSubmit = async (data: JoinRoomFormValues) => {
    await joinRoom(data);
  };

  return (
    <div className="col-md-5 p-5 border mx-auto">
      <h1 className="text-center text-primary mb-5">Join Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors.name ? (
            <span className="text-danger">{errors.name.message}</span>
          ) : null}
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control outline-0"
            placeholder="Room Id"
            style={{
              boxShadow: "none",
            }}
            {...register("roomId", {
              required: "This field is required",
            })}
          />
          {errors.roomId ? (
            <span className="text-danger">{errors.roomId.message}</span>
          ) : null}
        </div>
        <div className="form-group mt-5">
          <button type="submit" className="form-control btn btn-dark">
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoomForm;
