import Frame from '@/components/Frame/Frame';
import AccountTable from '@/components/Home/AccountTableBody/AccountTableBody';
import { AccountDataModel } from '@/types';
import { redirect } from 'next/navigation';
import { checkLogin } from './actions/auth';
import { getAccountAllData } from './actions/accounts';
import LogoutBtn from '@/components/Frame/LogoutBtn';

export default async function Home() {
  // 認証チェック
  const user = await checkLogin();
  if (!user) {
    return redirect('/session-error');
  }

  const accountAllData: AccountDataModel[] | null = await getAccountAllData();
  return (
    <>
      <Frame title={'アカウント一覧'} width="800px" isAddAccount={true}>
        <AccountTable accountAllData={accountAllData} />
        <LogoutBtn />
      </Frame>
    </>
  );
}
