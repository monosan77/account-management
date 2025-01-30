import { actionsDeleteAccount } from '@/app/actions/accounts';
import ButtonCustomSize from '@/components/Frame/ButtonCustomSize';
import { setIsClose } from '@/lib/redux/modalOpen';
import { RootState } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmButtons = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { accountId } = useSelector((state: RootState) => state.modalOpen);

  async function deleteAccount() {
    try {
      const isDeleteAccount = await actionsDeleteAccount(accountId);
      if (!isDeleteAccount) {
        throw new Error('削除できませんでした。');
      }
      dispatch(setIsClose());
      return router.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full mt-5 flex justify-around ">
      <ButtonCustomSize
        text="削除する"
        type="submit"
        width="100px"
        bgColor={'red'}
        textColor={'white'}
        handleClick={deleteAccount}
      />
      <ButtonCustomSize
        text="キャンセル"
        type="button"
        width="100px"
        bgColor={'white'}
        textColor={'#00B3FF'}
        handleClick={() => dispatch(setIsClose())}
      />
    </div>
  );
};

export default ConfirmButtons;
