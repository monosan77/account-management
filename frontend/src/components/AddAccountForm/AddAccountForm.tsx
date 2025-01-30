'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserName from '../AccountForm/UserName';
import Email from '../AccountForm/Email';
import TelNumber from '../AccountForm/TelNumber';
import Buttons from '../AccountForm/AccountFormBtns';
import { Inputs } from '@/types';
import { useRouter } from 'next/navigation';
import { actionsCreateAccount } from '@/app/actions/accounts';

const AddAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userName: '',
      email: '',
      tel: '',
    },
  });
  const router = useRouter();
  const [apiError, setApiError] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setApiError('');
    try {
      const createResult: { status: number } = await actionsCreateAccount(
        data.userName,
        data.email,
        data.tel
      );
      if (createResult.status === 409) {
        return setApiError('既に登録済みのメールアドレスです。');
      } else if (createResult.status === 500) {
        throw new Error('サーバーエラー');
      }
      router.push('/');
    } catch (error) {
      console.log(error);
      setApiError('サーバーエラーのため、アカウントを追加できませんでした。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserName register={register} errors={errors.userName?.message} />
      <Email register={register} errors={errors.email?.message} />
      <TelNumber register={register} errors={errors.tel?.message} />
      <p className="h-6 text-center text-red-600 text-xs">{apiError}</p>
      <Buttons />
    </form>
  );
};

export default AddAccountForm;
