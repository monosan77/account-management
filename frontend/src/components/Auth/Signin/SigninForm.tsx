'use client';
import Buttons from '../Buttons';
import InputList from './InputList';
import useSigninForm from '@/hooks/auth/useSigninForm';

export type SigninModel = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const { register, handleSubmit, onSubmit, errors, apiResResult } =
    useSigninForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputList register={register} errors={errors} />
      <p className="min-h-5 text-red-600 mb-4 text-center text-sm">
        {apiResResult}
      </p>
      <Buttons
        btnText="ログイン"
        linkText="新規管理者登録へ"
        linkPath="/auth/signup"
      />
    </form>
  );
};

export default SigninForm;
