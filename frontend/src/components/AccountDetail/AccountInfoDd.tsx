import React from 'react';
interface Prop {
  textData: string;
}
const AccountInfoDd = ({ textData }: Prop) => {
  return <dd className="mb-1 text-xs sm:text-lg">・{textData}</dd>;
};

export default AccountInfoDd;
