import SigninForm from '@/components/Auth/Signin/SigninForm';
import Frame from '@/components/Frame/Frame';
import React from 'react';

const SigninPage = () => {
  return (
    <Frame title="管理者ログイン" width="400px">
      <SigninForm />
    </Frame>
  );
};

export default SigninPage;
