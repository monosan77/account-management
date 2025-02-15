import React from 'react';
import EditORdeleteBtns from '../EditORdeleteBtns/EditORdeleteBtns';
import { AccountDataModel } from '@/types';
import Link from 'next/link';
type Prop = {
  accountData: AccountDataModel;
  indexNo: number;
};
const AccountData = ({ accountData, indexNo }: Prop) => {
  return (
    <tr>
      <td className="T-body-border">No.{indexNo}</td>
      <td className="T-body-border underline text-[#00B8FF] hover:text-red-600">
        <Link href={`/account-detail/${accountData.id}`}>
          {accountData.name}
        </Link>
      </td>
      <td className="T-body-border">{accountData.tel}</td>
      <td className="T-body-border">{accountData.email}</td>
      <td className="T-body-border ">
        <EditORdeleteBtns
          accountId={accountData.id}
          accountName={accountData.name}
          accountImageId={accountData.imageId}
        />
      </td>
    </tr>
  );
};

export default AccountData;
