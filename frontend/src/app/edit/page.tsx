import EditAccountForm from '@/components/EditAccountForm/EditAccountForm';
import Frame from '@/components/Frame/Frame';
import NoGetData from '@/components/NoGetData/NoGetData';
import { AccountDataModel } from '@/types';
import React from 'react';

const EditPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const accountId = (await searchParams).id;
  const accountData: AccountDataModel | null = await getOneAccount(accountId);
  return (
    <Frame title="アカウント追加" width="500px">
      {accountData ? (
        <EditAccountForm accountData={accountData} />
      ) : (
        <NoGetData />
      )}
    </Frame>
  );
};

export default EditPage;

async function getOneAccount(accountId: string) {
  try {
    const res = await fetch(
      `http://localhost:3001/account/oneAccount?id=${accountId}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      throw new Error('データを取得できませんでした。');
    }
    const accountAllData = await res.json();
    return accountAllData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
