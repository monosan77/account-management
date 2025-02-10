import EditAccountForm from '@/components/EditAccountForm/EditAccountForm';
import Frame from '@/components/Frame/Frame';
import NoGetData from '@/components/NoGetData/NoGetData';
import { AccountDataModel } from '@/types';
import React from 'react';
import { checkLogin } from '../actions/auth';
import { redirect } from 'next/navigation';
import { getOneAccount } from '../actions/accounts';

const EditPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  // 認証チェック
  const user = await checkLogin();
  if (!user) {
    return redirect('/session-error');
  }

  const accountId = (await searchParams).id;
  const accountData: AccountDataModel | null = await getOneAccount(accountId);
  return (
    <Frame title="アカウント編集" width="500px">
      {accountData ? (
        <EditAccountForm accountData={accountData} />
      ) : (
        <NoGetData />
      )}
    </Frame>
  );
};

export default EditPage;
