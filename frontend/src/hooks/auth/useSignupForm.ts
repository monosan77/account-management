import { SignupModel } from '@/components/Auth/Signup/SignupForm';
import { actionsAuthSignup } from '@/utils/fetchFunc/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useSignupForm() {
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

  return { register, handleSubmit, errors, watch, onSubmit, apiResResult };
}
