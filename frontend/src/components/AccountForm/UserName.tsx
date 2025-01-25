import { Inputs } from "@/types";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Prop ={
  register:UseFormRegister<Inputs>;
  errors?:string;
  
}

const UserName = ({errors,register}:Prop) => {
  return (
    <div>
      <label htmlFor="userName">
        ・名前{" "}
        {errors && (
          <span className="text-red-600 text-xs">
            {errors}
          </span>
        )}
      </label>
      <input
        type="text"
        id="userName"
        className="w-[calc(100%-48px)] px-1 mx-4 text-sm block border border-gray-600"
        {...register("userName", { required: "必須入力です" })}
        maxLength={18}
      />
    </div>
  );
};

export default UserName;
