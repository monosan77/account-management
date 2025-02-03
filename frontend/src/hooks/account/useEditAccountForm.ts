import { actionsUpdataAccount } from '@/app/actions/accounts';
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
      } else if (isResult.status === 401) {
        return router.push('/session-error');
      } else if (isResult.status === 500) {
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
