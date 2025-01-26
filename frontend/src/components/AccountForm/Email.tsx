import { Inputs } from '@/types';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
type Prop = {
  register: UseFormRegister<Inputs>;
  errors?: string;
};
const Email = ({ register, errors }: Prop) => {
  return (
    <div>
      <label htmlFor="email">
        ・メールアドレス{' '}
        {errors && <span className="text-red-600 text-xs">{errors}</span>}
      </label>
      <input
        type="email"
        id="email"
        className="w-[calc(100%-48px)] px-1 text-sm mx-4 block border border-gray-600"
        {...register('email', {
          required: '必須入力です',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '有効なメールアドレスを入力してください。',
          },
        })}
      />
    </div>
  );
};

export default Email;
