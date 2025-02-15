import { getOneAccount } from '@/app/actions/accounts';
import AccountDetail from '@/components/AccountDetail/AccountDetail';
import Frame from '@/components/Frame/Frame';
import NoGetData from '@/components/NoGetData/NoGetData';
import { AccountDataModel } from '@/types';
import React from 'react';

const AccountDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const accountId = (await params).id;
  const accountData: AccountDataModel | null = await getOneAccount(accountId);

  return (
    <Frame title={'アカウント詳細'} width="800px" isAddAccount={false}>
      {accountData ? (
        <AccountDetail accountData={accountData} />
      ) : (
        <NoGetData />
      )}
    </Frame>
  );
};

export default AccountDetailPage;
