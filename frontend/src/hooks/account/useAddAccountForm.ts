import { actionsCreateAccount } from '@/app/actions/accounts';
import { Inputs } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useAddAccountForm() {
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
      } else if (createResult.status === 401) {
        return router.push('/session-error');
      } else if (createResult.status === 500) {
        throw new Error('サーバーエラー');
      }
      router.push('/');
    } catch (error) {
      console.log(error);
      setApiError('サーバーエラーのため、アカウントを追加できませんでした。');
    }
  };

  return { register, handleSubmit, errors, apiError, onSubmit };
}
