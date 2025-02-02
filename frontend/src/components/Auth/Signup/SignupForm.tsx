'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Buttons from '../Buttons';
import InputList from './InputList';
import { useRouter } from 'next/navigation';
import { actionsAuthSignup } from '@/app/actions/auth';

export type SignupModel = {
  userName: string;
  email: string;
  password: string;
  confPass: string;
};

const SignupForm = () => {
  const router = useRouter();
  const [apiResResult, setApiResResult] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupModel>();
  const onSubmit: SubmitHandler<SignupModel> = async (data) => {
    setApiResResult('loading...');
    try {
      const { statsCode } = await actionsAuthSignup(data);
      if (statsCode === 409) {
        setApiResResult('既に存在するメールアドレスです。');
      } else if (statsCode === 500) {
        setApiResResult('予期せぬエラーが発生しました。');
      } else if (statsCode === 200) {
        router.push('/');
        setApiResResult('');
      }
    } catch (error) {
      console.log(error);
      setApiResResult('サーバーエラーが発生しました。');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputList register={register} errors={errors} watch={watch} />
      <p className="min-h-5 text-red-600 mb-4 text-center text-sm">
        {apiResResult}
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
