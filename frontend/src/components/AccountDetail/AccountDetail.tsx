import Image from 'next/image';
import React from 'react';
import AccountInfo from './AccountInfo';
import { AccountDataModel } from '@/types';

interface Prop {
  accountData: AccountDataModel;
}
const AccountDetail = ({ accountData }: Prop) => {
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center items-center w-1/2">
        <Image
          src={accountData.image}
          alt="アカウント画像"
          width={400}
          height={400}
          className="w-full mr-4 object-cover"
        />
      </div>
      <AccountInfo accountData={accountData} />
    </div>
  );
};

export default AccountDetail;
