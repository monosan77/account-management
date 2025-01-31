import SignupForm from '@/components/Auth/Signup/SignupForm';
import Frame from '@/components/Frame/Frame';
import React from 'react';

const SignupPage = () => {
  return (
    <Frame title="管理者登録" width="400px">
      <SignupForm />
    </Frame>
  );
};

export default SignupPage;
