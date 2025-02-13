'use client';
import UserName from '../AccountForm/UserName';
import Email from '../AccountForm/Email';
import TelNumber from '../AccountForm/TelNumber';
import Buttons from '../AccountForm/AccountFormBtns';
import useAddAccountForm from '@/hooks/account/useAddAccountForm';
import AccountImage from '../AccountForm/AccountImage';

const AddAccountForm = () => {
  const { register, handleSubmit, errors, apiError, onSubmit } =
    useAddAccountForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserName register={register} errors={errors.userName?.message} />
      <Email register={register} errors={errors.email?.message} />
      <TelNumber register={register} errors={errors.tel?.message} />
      <AccountImage register={register} errors={errors.image?.message} />

      <p className="h-6 text-center text-red-600 text-xs">{apiError}</p>
      <Buttons />
    </form>
  );
};

export default AddAccountForm;
