'use client';
import AccountData from '../AccountData/AccountData';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import DataTitle from '../DataTitle/DataTitle';
import NoGetData from '@/components/NoGetData/NoGetData';
import { useGetAllAccountQuery } from '@/lib/redux/Account/Account.service';

const AccountTable = () => {
  // 削除モーダルの開閉
  const { isOpen } = useSelector((state: RootState) => state.modalOpen);
  const { data, isLoading } = useGetAllAccountQuery();

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : data ? (
        <table className=" text-center ">
          <thead className="mb-2">
            <DataTitle />
          </thead>
          <tbody>
            {data.map((account, index) => (
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
