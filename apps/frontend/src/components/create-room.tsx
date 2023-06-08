import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { CreateRoomFormValues } from "../api/types";

const CreateRoomForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRoomFormValues>();

  const onSubmit = (data: CreateRoomFormValues) => {
    console.log(data);
  };

  return (
    <div className="col-md-5 p-5 border mx-auto">
      <h1 className="text-center text-primary mb-5">Create Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group my-2">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            {...register("name", {
              required: "The field is required",
            })}
          />
          {errors.name ? (
            <span className="text-danger">{errors.name.message}</span>
          ) : null}
        </div>
        <div className="input-group my-2 border align-items-center">
          <input
            type="text"
            className="form-control border-0 outline-0"
            readOnly={true}
            style={{
              boxShadow: "none",
              zIndex: "0 !important",
              fontSize: "0.89rem !important",
            }}
            {...register("code", {
              required: true,
              value: nanoid(),
            })}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary  border-0 btn-sm"
              type="button"
              onClick={() => setValue("code", nanoid())}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="form-group mt-5">
          <button type="submit" className="form-control btn btn-dark">
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomForm;
