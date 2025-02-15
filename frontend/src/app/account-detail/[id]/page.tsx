import AccountDetail from '@/components/AccountDetail/AccountDetail';
import Frame from '@/components/Frame/Frame';
import React from 'react';

const AccountDetailPage = () => {
  return (
    <Frame title={'アカウント詳細'} width="850px" isAddAccount={false}>
      <AccountDetail />
    </Frame>
  );
};

export default AccountDetailPage;
