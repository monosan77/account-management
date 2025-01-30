'use client';
import { setIsOpen } from '@/lib/redux/modalOpen';
import Link from 'next/link';
// import { useState } from 'react';
import { useDispatch } from 'react-redux';

type Prop = {
  accountId: string;
  accountName: string;
};

const EditORdeleteBtns = ({ accountId, accountName }: Prop) => {
  const dispatch = useDispatch();
  return (
    <>
      <Link
        href={`/edit?id=${accountId}`}
        className="btn-style bg-[#C6E0EC] hover:opacity-85"
      >
        編集
      </Link>
      <button
        type="button"
        onClick={() => dispatch(setIsOpen({ accountName, accountId }))}
        className="btn-style bg-[#ED828D] hover:opacity-85"
      >
        削除
      </button>
    </>
  );
};

export default EditORdeleteBtns;
