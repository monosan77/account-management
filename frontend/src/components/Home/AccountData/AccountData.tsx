import React from 'react';
import EditORdeleteBtns from '../EditORdeleteBtns/EditORdeleteBtns';

const AccountData = () => {
  return (
    <tr>
      <td className="T-body-border">No.1</td>
      <td className="T-body-border">坂本龍馬</td>
      <td className="T-body-border">090-1234-5678</td>
      <td className="T-body-border">sakamoto@example.com</td>
      <td className="T-body-border ">
        <EditORdeleteBtns />
      </td>
    </tr>
  );
};

export default AccountData;
