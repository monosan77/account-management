import { SigninModel } from '@/components/Auth/Signin/SigninForm';
import { actionsAuthSignin } from '@/utils/fetchFunc/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useSigninForm() {
  const router = useRouter();
  const [apiResResult, setApiResResult] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninModel>();
  const onSubmit: SubmitHandler<SigninModel> = async (data) => {
    setApiResResult('loading');
    try {
      const { statsCode } = await actionsAuthSignin(data);
      if (statsCode === 401) {
        setApiResResult('メールかパスワードが違います。');
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

  return { register, handleSubmit, onSubmit, errors, apiResResult };
}
