import AddAccountForm from '@/components/AddAccountForm/AddAccountForm';
import Frame from '@/components/Frame/Frame';
import React from 'react';
import { checkLogin } from '../actions/auth';
import { redirect } from 'next/navigation';

const AddPage = async () => {
  // 認証チェック
  const user = await checkLogin();
  if (!user) {
    return redirect('/session-error');
  }
  return (
    <Frame title="アカウント追加" width="500px">
      <AddAccountForm />
    </Frame>
  );
};

export default AddPage;
