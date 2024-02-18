import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

const Try = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });

  console.log(watch("example"));
  return (
    <div>
      <form
        className=" bg-red-500"
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <label>Example</label>
        <input {...register("example")} defaultValue="test" />
        <label>ExampleRequired</label>
        <input
          {...register("exampleRequired", { required: true, maxLength: 10 })}
        />
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Try;
