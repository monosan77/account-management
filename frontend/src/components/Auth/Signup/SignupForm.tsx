'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Buttons from '../Buttons';
import InputList from './InputList';

export type SignupModel = {
  userName: string;
  email: string;
  password: string;
  confPass: string;
};

const SignupForm = () => {
  const [apiError, setApiError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupModel>();
  const onSubmit: SubmitHandler<SignupModel> = (data) => {
    setApiError('');
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputList register={register} errors={errors} watch={watch} />
      <p className="min-h-5 text-red-600 mb-4 text-center text-sm">
        {apiError}
      </p>
      <Buttons
        btnText="登録"
        linkText="ログイン画面へ"
        linkPath="/auth/signin"
      />
    </form>
  );
};

export default SignupForm;
