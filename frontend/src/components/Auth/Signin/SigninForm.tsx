'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Buttons from '../Buttons';
import InputList from './InputList';

export type SigninModel = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const [apiError, setApiError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninModel>();
  const onSubmit: SubmitHandler<SigninModel> = (data) => {
    setApiError('');
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputList register={register} errors={errors} />
      <p className="min-h-5 text-red-600 mb-4 text-center text-sm">
        {apiError}
      </p>
      <Buttons
        btnText="ログイン"
        linkText="新規管理者登録へ"
        linkPath="/auth/signup"
      />
    </form>
  );
};

export default SigninForm;
