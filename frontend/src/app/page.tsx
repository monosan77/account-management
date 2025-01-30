import Frame from '@/components/Frame/Frame';
import AccountTable from '@/components/Home/AccountTableBody/AccountTableBody';
import { AccountDataModel } from '@/types';

export default async function Home() {
  const accountAllData: AccountDataModel[] | null = await getAccountAllData();

  return (
    <Frame title={'アカウント一覧'} width="800px" isAddAccount={true}>
      <AccountTable accountAllData={accountAllData} />
    </Frame>
  );
}

async function getAccountAllData() {
  try {
    const res = await fetch('http://localhost:3001/account/allAccount', {
      next: { revalidate: 3600 },
    });
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
