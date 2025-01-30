import React from 'react';
import EditORdeleteBtns from '../EditORdeleteBtns/EditORdeleteBtns';
import { AccountDataModel } from '@/types';
type Prop = {
  accountData: AccountDataModel;
  indexNo: number;
};
const AccountData = ({ accountData, indexNo }: Prop) => {
  return (
    <tr>
      <td className="T-body-border">No.{indexNo}</td>
      <td className="T-body-border">{accountData.name}</td>
      <td className="T-body-border">{accountData.tel}</td>
      <td className="T-body-border">{accountData.email}</td>
      <td className="T-body-border ">
        <EditORdeleteBtns
          accountId={accountData.id}
          accountName={accountData.name}
        />
      </td>
    </tr>
  );
};

export default AccountData;
