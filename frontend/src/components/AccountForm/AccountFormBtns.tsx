import ButtonCustomSize from '../Frame/ButtonCustomSize';
import { useRouter } from 'next/navigation';

const AccountFormBtns = () => {
  const router = useRouter();
  return (
    <div className="w-full mt-5 flex justify-around ">
      <ButtonCustomSize
        text="保存する"
        type="submit"
        width="100px"
        bgColor={'#00B3FF'}
        textColor={'#ffffff'}
      />
      <ButtonCustomSize
        text="キャンセル"
        type="button"
        width="100px"
        bgColor={'white'}
        textColor={'#00B3FF'}
        handleClick={() => router.back()}
      />
    </div>
  );
};

export default AccountFormBtns;
