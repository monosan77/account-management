'use client';
import React from 'react';
import AccountInfoDt from './AccountInfoDt';
import AccountInfoDd from './AccountInfoDd';
import ButtonCustomSize from '../Frame/ButtonCustomSize';
import { useRouter } from 'next/navigation';

const AccountInfo = () => {
  const router = useRouter();
  return (
    <div className="w-1/2 my-6 ml-4 flex justify-between flex-col">
      <dl>
        <AccountInfoDt title="ユーザーネーム" />
        <AccountInfoDd textData="坂本太郎" />
        <AccountInfoDt title="メールアドレス" />
        <AccountInfoDd textData="test@example.com" />
        <AccountInfoDt title="電話番号" />
        <AccountInfoDd textData="09012345678" />
      </dl>
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
