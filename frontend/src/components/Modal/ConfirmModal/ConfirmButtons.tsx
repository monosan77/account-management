import ButtonCustomSize from '@/components/Frame/ButtonCustomSize';
import { useDeleteAccountMutation } from '@/lib/redux/Account/Account.service';
import { setIsClose } from '@/lib/redux/modalOpen';
import { RootState } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmButtons = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { accountId } = useSelector((state: RootState) => state.modalOpen);

  const [deleteAccount] = useDeleteAccountMutation();
  async function handleDeleteAccount() {
    try {
      const result = await deleteAccount(accountId);
      const status = result.data?.status;
      if (status === 500) {
        throw new Error('削除できませんでした。');
      } else if (status === 401) {
        return router.push('/session-error');
      } else if (status === 200) {
        dispatch(setIsClose());
      } else {
        throw new Error('予期せぬエラーが発生しました。');
      }
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
        handleClick={handleDeleteAccount}
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
