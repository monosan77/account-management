import Frame from "@/components/Frame/Frame";
import AccountData from "@/components/Home/AccountData/AccountData";
import DataTitle from "@/components/Home/DataTitle/DataTitle";

export default function Home() {
  return (
    <Frame title={"アカウント一覧"} width="800px" isAddAccount={true}>
      <table className=" text-center ">
        <thead className="mb-2">
          <DataTitle/>
        </thead>
        <tbody>
          <AccountData/>
        </tbody>
      </table>
    </Frame>
  );
}
