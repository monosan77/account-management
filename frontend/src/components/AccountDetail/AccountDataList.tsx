import AccountInfoDt from './AccountInfoDt';
import AccountInfoDd from './AccountInfoDd';
interface Prop {
  name: string;
  email: string;
  tel: string;
}
const AccountDataList = ({ name, email, tel }: Prop) => {
  return (
    <dl className="flex-1 mb-2 sm:mb-7 w-full flex justify-between flex-col ">
      <div>
        <AccountInfoDt title="ユーザーネーム" />
        <AccountInfoDd textData={name} />
      </div>
      <div>
        <AccountInfoDt title="メールアドレス" />
        <AccountInfoDd textData={email} />
      </div>
      <div>
        <AccountInfoDt title="電話番号" />
        <AccountInfoDd textData={tel} />
      </div>
    </dl>
  );
};

export default AccountDataList;
