import { useEditAccountMutation } from '@/lib/redux/Account/Account.service';
import { AccountDataModel, Inputs } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useEditAccountForm(accountData: AccountDataModel) {
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
  const [editAccount] = useEditAccountMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setApiError('');
    try {
      const result = await editAccount({
        id: accountData.id,
        name: data.userName,
        email: data.email,
        tel: data.tel,
      });
      const status = result.data?.status;
      if (status === 409) {
        return setApiError('登録済みのメールアドレスです。');
      } else if (status === 401) {
        return router.push('/session-error');
      } else if (status === 500) {
        throw new Error('サーバーエラーが発生しました。');
      }
      return router.push('/');
    } catch (error) {
      console.log(error);
      setApiError('サーバーエラーのため、アカウントを更新できませんでした。');
    }
  };

  return { register, handleSubmit, errors, apiError, onSubmit };
}
