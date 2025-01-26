import ButtonCustomSize from '@/components/Frame/ButtonCustomSize';
interface Prop {
  handleCloseModal: () => void;
}
const ConfirmButtons = ({ handleCloseModal }: Prop) => {
  return (
    <div className="w-full mt-5 flex justify-around ">
      <ButtonCustomSize
        text="削除する"
        type="submit"
        width="100px"
        bgColor={'red'}
        textColor={'white'}
      />
      <ButtonCustomSize
        text="キャンセル"
        type="button"
        width="100px"
        bgColor={'white'}
        textColor={'#00B3FF'}
        handleClick={handleCloseModal}
      />
    </div>
  );
};

export default ConfirmButtons;
