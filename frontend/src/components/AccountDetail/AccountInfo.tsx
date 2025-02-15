'use client';
import ButtonCustomSize from '../Frame/ButtonCustomSize';
import { useRouter } from 'next/navigation';
import { AccountDataModel } from '@/types';
import AccountDataList from './AccountDataList';
interface Prop {
  accountData: AccountDataModel;
}
const AccountInfo = ({ accountData }: Prop) => {
  const router = useRouter();
  return (
    <div className="w-1/2 my-6 ml-4 flex justify-between flex-col">
      <AccountDataList
        name={accountData.name}
        email={accountData.email}
        tel={accountData.tel}
      />
      <ButtonCustomSize
        text="戻る"
        bgColor="#00B3FF"
        textColor="#fff"
        type="button"
        width="100%"
        handleClick={() => router.back()}
      />
    </div>
  );
};

export default AccountInfo;
