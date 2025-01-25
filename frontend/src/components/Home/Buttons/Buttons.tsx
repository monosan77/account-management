import Link from "next/link";

const Buttons = () => {
  return (
    <>
      <Link href={"/edit"} className="btn-style bg-[#C6E0EC]">
        編集
      </Link>
      <button type="button" className="btn-style bg-[#ED828D]">
        削除
      </button>
    </>
  );
};

export default Buttons;
