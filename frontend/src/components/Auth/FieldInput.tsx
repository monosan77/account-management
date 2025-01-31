import React from 'react';
import { FieldError } from 'react-hook-form';

type FieldInputProp = {
  id: 'userName' | 'email' | 'password' | 'confPass';
  label: string;
  error?: FieldError;
  children: React.ReactNode;
};

const FieldLabel = ({ id, label, error, children }: FieldInputProp) => {
  return (
    <div className="flex flex-col mb-6">
      <p>
        <label htmlFor={id}>{label}</label>
        <span className="ml-3 text-sm text-red-600">
          {error && error.message}
        </span>
      </p>
      {/* input要素を入れる */}
      {children}
    </div>
  );
};

export default FieldLabel;
