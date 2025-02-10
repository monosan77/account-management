import Frame from '@/components/Frame/Frame';
import AccountTable from '@/components/Home/AccountTableBody/AccountTableBody';
import { redirect } from 'next/navigation';
import { checkLogin } from './actions/auth';
import LogoutBtn from '@/components/Frame/LogoutBtn';

export default async function Home() {
  // 認証チェック
  const user = await checkLogin();
  if (!user) {
    return redirect('/session-error');
  }

  return (
    <>
      <Frame title={'アカウント一覧'} width="800px" isAddAccount={true}>
        <AccountTable />
        {/* <AccountTable accountAllData={accountAllData} /> */}
        <LogoutBtn />
      </Frame>
    </>
  );
}
