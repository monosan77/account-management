"use client";
import { Inputs } from "@/types";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UserName from "../AccountForm/UserName";
import Email from "../AccountForm/Email";
import TelNumber from "../AccountForm/TelNumber";
import Buttons from "../AccountForm/AccountFormBtns";

type Prop = {
  formData: FormData;
};
// 仮のデータ型処理書いたときに調整する。
interface FormData {
  userName: string;
  email: string;
  TellNum: string;
}
const EditAccountForm = ({ formData }: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userName: formData.userName,
      email: formData.email,
      tellNum: formData.TellNum,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserName register={register} errors={errors.userName?.message} />
      <Email register={register} errors={errors.email?.message} />
      <TelNumber register={register} errors={errors.tellNum?.message} />
      <Buttons />
    </form>
  );
};

export default EditAccountForm;
