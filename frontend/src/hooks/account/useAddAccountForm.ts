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
      image: [],
    },
  });
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const [addAccount, { isLoading }] = useAddAccountMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setApiError('');
    console.log(data.image);
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('name', data.userName);
    formData.append('email', data.email);
    formData.append('tel', data.tel);
    try {
      const { data } = await addAccount(formData);
      const status = data?.status;

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

  return { register, handleSubmit, errors, apiError, onSubmit, isLoading };
}
