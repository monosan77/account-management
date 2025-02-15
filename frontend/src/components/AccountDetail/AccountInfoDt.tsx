interface Prop {
  title: string;
}
const AccountInfoDt = ({ title }: Prop) => {
  return <dt className="text-xl font-bold mb-2">{title}</dt>;
};

export default AccountInfoDt;
