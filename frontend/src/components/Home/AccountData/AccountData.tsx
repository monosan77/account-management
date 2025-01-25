import React from "react";
import Buttons from "../Buttons/Buttons";

const AccountData = () => {
  return (
    <tr>
      <td className="T-body-border">No.1</td>
      <td className="T-body-border">坂本龍馬</td>
      <td className="T-body-border">090-1234-5678</td>
      <td className="T-body-border">sakamoto@example.com</td>
      <td className="T-body-border ">
        <Buttons />
      </td>
    </tr>
  );
};

export default AccountData;
