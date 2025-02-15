import Image from 'next/image';
import React from 'react';
import AccountInfo from './AccountInfo';

const AccountDetail = () => {
  return (
    <div className="flex justify-center ">
      <Image
        src="/account/no-image-account.png"
        alt="アカウント画像"
        width={400}
        height={400}
        className="w-1/2 mr-4"
      />
      <AccountInfo />
    </div>
  );
};

export default AccountDetail;
