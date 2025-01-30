'use client';
import React from 'react';
import AccountData from '../AccountData/AccountData';
import { AccountDataModel } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import DataTitle from '../DataTitle/DataTitle';
import NoGetData from '@/components/NoGetData/NoGetData';
type Prop = {
  accountAllData: AccountDataModel[] | null;
};
const AccountTable = ({ accountAllData }: Prop) => {
  // 削除モーダルの開閉
  const { isOpen } = useSelector((state: RootState) => state.modalOpen);
  return (
    <>
      {accountAllData ? (
        <table className=" text-center ">
          <thead className="mb-2">
            <DataTitle />
          </thead>
          <tbody>
            {accountAllData.map((account, index) => (
              <AccountData
                key={account.id}
                accountData={account}
                indexNo={index + 1}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NoGetData />
      )}

      {/* 削除確認モーダル */}
      {isOpen && <ConfirmModal />}
    </>
  );
};

export default AccountTable;
