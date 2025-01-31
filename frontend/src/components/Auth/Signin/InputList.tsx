import React from 'react';
import FieldLabel from '../FieldInput';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SigninModel } from './SigninForm';
type Props = {
  register: UseFormRegister<SigninModel>;
  errors: FieldErrors<SigninModel>;
};
const InputList = ({ register, errors }: Props) => {
  return (
    <>
      <FieldLabel id={'email'} label={'メールアドレス'} error={errors.email}>
        <input
          type="text"
          id="email"
          {...register('email', {
            required: '必須入力です',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '有効なメールアドレスを入力してください。',
            },
          })}
          className="p-1 text-sm border border-gray-800"
        />
      </FieldLabel>
      <FieldLabel id={'password'} label={'パスワード'} error={errors.password}>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'パスワードを入力してください',
            minLength: {
              value: 8,
              message: '8文字以上で入力してください',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '大文字と数字を1つ以上含めてください',
            },
          })}
          className="p-1 text-sm border border-gray-800"
        />
      </FieldLabel>
    </>
  );
};

export default InputList;
