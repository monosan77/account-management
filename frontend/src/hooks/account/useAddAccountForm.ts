import { useAddAccountMutation } from '@/lib/redux/Account/Account.service';
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
  const [addAccount] = useAddAccountMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setApiError('');
    try {
      const result = await addAccount({
        name: data.userName,
        email: data.email,
        tel: data.tel,
      });
      const status = result.data?.status;
      console.log(status);

      if (status === 409) {
        return setApiError('既に登録済みのメールアドレスです。');
      } else if (status === 401) {
        return router.push('/session-error');
      } else if (status === 201) {
        router.push('/');
      } else {
        throw new Error('サーバーエラー');
      }
    } catch (error) {
      console.log(error);
      setApiError('サーバーエラーのため、アカウントを追加できませんでした。');
    }
  };

  return { register, handleSubmit, errors, apiError, onSubmit };
}
