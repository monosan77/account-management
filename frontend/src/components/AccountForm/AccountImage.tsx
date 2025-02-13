import { Inputs } from '@/types';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Prop = {
  register: UseFormRegister<Inputs>;
  errors?: string;
};

const AccountImage = ({ register, errors }: Prop) => {
  return (
    <div className="">
      <label htmlFor="image">
        ・アカウント画像{' '}
        {errors && <span className="text-red-600 text-xs">{errors}</span>}
      </label>
      <input
        type="file"
        id="image"
        className="w-[calc(100%-48px)] px-1 text-sm mx-4  block "
        {...register('image', {
          required: '必須入力です',
        })}
      />
    </div>
  );
};

export default AccountImage;
