'use client';
import { AccountDataModel, Inputs } from '@/types';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserName from '../AccountForm/UserName';
import Email from '../AccountForm/Email';
import TelNumber from '../AccountForm/TelNumber';
import Buttons from '../AccountForm/AccountFormBtns';
import { useRouter } from 'next/navigation';
import { actionsUpdataAccount } from '@/app/actions/accounts';

type Prop = {
  accountData: AccountDataModel;
};

const EditAccountForm = ({ accountData }: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userName: accountData.name,
      email: accountData.email,
      tel: accountData.tel,
    },
  });

  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setApiError('');
    try {
      const isResult = await actionsUpdataAccount(
        accountData.id,
        data.userName,
        data.email,
        data.tel
      );
      if (isResult.status === 409) {
        return setApiError('登録済みのメールアドレスです。');
      } else if (isResult.status === 500) {
        throw new Error('サーバーエラーが発生しました。');
      }
      return router.push('/');
    } catch (error) {
      console.log(error);
      setApiError('サーバーエラーのため、アカウントを更新できませんでした。');
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

export default EditAccountForm;
