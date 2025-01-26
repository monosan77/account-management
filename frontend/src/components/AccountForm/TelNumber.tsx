import { Inputs } from '@/types';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
type Prop = {
  register: UseFormRegister<Inputs>;
  errors?: string;
};
const TelNumber = ({ register, errors }: Prop) => {
  return (
    <div className="">
      <label htmlFor="tellNum">
        ・携帯番号{' '}
        {errors && <span className="text-red-600 text-xs">{errors}</span>}
      </label>
      <input
        type="tel"
        id="tellNum"
        className="w-[calc(100%-48px)] px-1 text-sm mx-4  block border border-gray-600"
        {...register('tellNum', {
          required: '必須入力です',
          pattern: {
            value: /^0[5789]0\d{8}$/, // ハイフンなし10〜11桁の携帯番号
            message: '有効な携帯番号を入力してください。',
          },
        })}
        placeholder="「-」ハイフン無しで入力してください"
      />
    </div>
  );
};

export default TelNumber;
