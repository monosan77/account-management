import ConfirmButtons from './ConfirmButtons';

interface Prop {
  handleCloseModal: () => void;
}
const ConfirmModal = ({ handleCloseModal }: Prop) => {
  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-45">
      <div className="w-[600px] border-2 border-red-600 bg-[#FFF8F8] p-7 rounded-md">
        <div>
          <p>
            <span className="font-bold">坂本龍馬</span>{' '}
            さんのアカウントを削除します。
          </p>
          <p>削除したらもとに戻せません。</p>
        </div>
        <ConfirmButtons handleCloseModal={handleCloseModal} />
      </div>
    </div>
  );
};

export default ConfirmModal;
