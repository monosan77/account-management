import { useSelector } from 'react-redux';
import ConfirmButtons from './ConfirmButtons';
import { RootState } from '@/lib/redux/store';

// interface Prop {
//   name: string;
// }
const ConfirmModal = () => {
  const { name } = useSelector((state: RootState) => state.modalOpen);
  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-45">
      <div className="w-[600px] border-2 border-red-600 bg-[#FFF8F8] p-7 rounded-md">
        <div className="text-center">
          <p>
            <span className="font-bold">{name}</span>{' '}
            さんのアカウントを削除します。
          </p>
          <p>削除したらもとに戻せません。</p>
        </div>
        <ConfirmButtons />
      </div>
    </div>
  );
};

export default ConfirmModal;
