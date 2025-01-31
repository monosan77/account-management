import React from 'react';
import FieldLabel from '../FieldInput';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { SignupModel } from './SignupForm';

type Props = {
  register: UseFormRegister<SignupModel>;
  errors: FieldErrors<SignupModel>;
  watch: UseFormWatch<SignupModel>;
};
const InputList = ({ register, errors, watch }: Props) => {
  const password = watch('password');
  return (
    <>
      <FieldLabel
        id={'userName'}
        label={'ユーザーネーム'}
        error={errors.userName}
      >
        <input
          type="text"
          id="userName"
          {...register('userName', { required: '必須入力です' })}
          className="p-1 text-sm border border-gray-800"
        />
      </FieldLabel>
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
      <FieldLabel
        id={'confPass'}
        label={'パスワード確認'}
        error={errors.confPass}
      >
        <input
          type="password"
          id="confPass"
          {...register('confPass', {
            required: 'パスワードを再入力してください',
            validate: (value) =>
              value === password || 'パスワードが一致しません',
          })}
          className="p-1 text-sm border border-gray-800"
        />
      </FieldLabel>
    </>
  );
};

export default InputList;
