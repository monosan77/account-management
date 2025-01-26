'use client';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';
import Link from 'next/link';
import { useState } from 'react';

const EditORdeleteBtns = () => {
  // Reduxを使うので後で修正
  const [isOpenModal, setIsOpenModal] = useState(false);
  function handleCloseModal() {
    setIsOpenModal(!isOpenModal);
  }
  return (
    <>
      <Link href={'/edit'} className="btn-style bg-[#C6E0EC] hover:opacity-85">
        編集
      </Link>
      <button
        type="button"
        onClick={handleCloseModal}
        className="btn-style bg-[#ED828D] hover:opacity-85"
      >
        削除
      </button>
      {isOpenModal && <ConfirmModal handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default EditORdeleteBtns;
