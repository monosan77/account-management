import React from 'react';
interface Prop {
  textData: string;
}
const AccountInfoDd = ({ textData }: Prop) => {
  return <dd className="mb-10">・{textData}</dd>;
};

export default AccountInfoDd;
