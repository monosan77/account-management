'use client';
import Buttons from '../Buttons';
import InputList from './InputList';
import useSignupForm from '@/hooks/auth/useSignupForm';

export type SignupModel = {
  userName: string;
  email: string;
  password: string;
  confPass: string;
};

const SignupForm = () => {
  const { register, handleSubmit, errors, watch, onSubmit, apiResResult } =
    useSignupForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputList register={register} errors={errors} watch={watch} />
      <p className="min-h-5 text-red-600 mb-4 text-center text-sm">
        {apiResResult}
      </p>
      <Buttons
        btnText="登録"
        linkText="ログイン画面へ"
        linkPath="/auth/signin"
      />
    </form>
  );
};

export default SignupForm;
