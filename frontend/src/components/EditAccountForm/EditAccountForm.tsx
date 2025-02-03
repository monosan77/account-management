'use client';
import { AccountDataModel } from '@/types';
import UserName from '../AccountForm/UserName';
import Email from '../AccountForm/Email';
import TelNumber from '../AccountForm/TelNumber';
import Buttons from '../AccountForm/AccountFormBtns';
import useEditAccount from '@/hooks/account/useEditAccountForm';

type Prop = {
  accountData: AccountDataModel;
};

const EditAccountForm = ({ accountData }: Prop) => {
  const { register, handleSubmit, errors, apiError, onSubmit } =
    useEditAccount(accountData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserName register={register} errors={errors.userName?.message} />
      <Email register={register} errors={errors.email?.message} />
      <TelNumber register={register} errors={errors.tel?.message} />
      <p className="h-6 text-center text-red-600 text-xs">{apiError}</p>
      <Buttons />
    </form>
  );
};

export default EditAccountForm;
