'use client';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import { setIsOpen } from '@/lib/redux/modalOpen';
import { RootState } from '@/lib/redux/store';
import Link from 'next/link';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditORdeleteBtns = () => {
  // Reduxを使うので後で修正
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const isOpenModal = useSelector((state: RootState) => state.modalOpen.value);
  const dispatch = useDispatch();
  // function handleCloseModal() {
  //   // setIsOpenModal(!isOpenModal);
  // }
  return (
    <>
      <Link href={'/edit'} className="btn-style bg-[#C6E0EC] hover:opacity-85">
        編集
      </Link>
      <button
        type="button"
        onClick={() => dispatch(setIsOpen())}
        // onClick={handleCloseModal}
        className="btn-style bg-[#ED828D] hover:opacity-85"
      >
        削除
      </button>
      {isOpenModal && (
        <ConfirmModal handleCloseModal={() => dispatch(setIsOpen())} />
      )}
      {/* {isOpenModal && <ConfirmModal handleCloseModal={handleCloseModal} />} */}
    </>
  );
};

export default EditORdeleteBtns;
